#!/usr/bin/env bash
set -euo pipefail

# ────────────────────────────────────────────────────────────────────────────────
# 1. Load .env into environment
# ────────────────────────────────────────────────────────────────────────────────
if [[ -f .env ]]; then
  export $(grep -vE '^\s*($|#)' .env | xargs)
else
  echo "❗  .env not found in $(pwd). Aborting."
  exit 1
fi

# ────────────────────────────────────────────────────────────────────────────────
# 2. Ensure required vars are set
# ────────────────────────────────────────────────────────────────────────────────
: "${DB_NAME:?DB_NAME not set in .env}"
: "${DB_USER:?DB_USER not set in .env}"
: "${DB_PASSWORD:?DB_PASSWORD not set in .env}"
: "${DB_HOST:?DB_HOST not set in .env}"
: "${PORT:?PORT not set in .env}"

DATA_BACKUP_DIR="./dbDataLogs"
SCHEMA_FILE="./dbSchema/v1.sql"

# ────────────────────────────────────────────────────────────────────────────────
# 3. Dump existing data if DB exists
# ────────────────────────────────────────────────────────────────────────────────
export PGPASSWORD="$DB_PASSWORD"

mkdir -p "$DATA_BACKUP_DIR"

echo "💾 Saving existing DB data to '$DATA_BACKUP_DIR/backup.sql' (if DB exists)..."
pg_dump -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -f "$DATA_BACKUP_DIR/backup.sql" || true

# ────────────────────────────────────────────────────────────────────────────────
# 4. Reset the database
# ────────────────────────────────────────────────────────────────────────────────
echo "🔄 Resetting database '$DB_NAME' on host '$DB_HOST' as user '$DB_USER'..."
psql -h "$DB_HOST" -U "$DB_USER" -d "postgres" -c "DROP DATABASE IF EXISTS \"$DB_NAME\";"
psql -h "$DB_HOST" -U "$DB_USER" -d "postgres" -c "CREATE DATABASE \"$DB_NAME\";"

# ────────────────────────────────────────────────────────────────────────────────
# 5. Load your schema into the fresh DB
# ────────────────────────────────────────────────────────────────────────────────
if [[ ! -f "$SCHEMA_FILE" ]]; then
  echo "❗ Schema file '$SCHEMA_FILE' not found. Please place it at project root."
  exit 1
fi

echo "📄 Loading schema from '$SCHEMA_FILE' into '$DB_NAME'..."
psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -f "$SCHEMA_FILE"

# ────────────────────────────────────────────────────────────────────────────────
# 6. Replay previously saved data (if backup exists)
# ────────────────────────────────────────────────────────────────────────────────
if [[ -f "$DATA_BACKUP_DIR/backup.sql" ]]; then
  echo "♻️ Restoring saved data from '$DATA_BACKUP_DIR/backup.sql'..."
  psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -f "$DATA_BACKUP_DIR/backup.sql" || true
else
  echo "ℹ️ No previous data to restore."
fi

# ────────────────────────────────────────────────────────────────────────────────
# 7. Launch psql in a parallel terminal for DB testing
# ────────────────────────────────────────────────────────────────────────────────
echo "🖥️  Opening psql terminal for direct DB access..."
osascript &>/dev/null <<EOF
tell application "Terminal"
    do script "PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -U $DB_USER -d $DB_NAME"
end tell
EOF

# ────────────────────────────────────────────────────────────────────────────────
# 8. Launch your backend
# ────────────────────────────────────────────────────────────────────────────────
echo "🚀 Starting backend with 'yarn dev' on port $PORT..."
yarn dev
