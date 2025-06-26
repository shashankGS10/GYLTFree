
-- ===================================================================================
--
--  Personal Growth & Forecasting Database Schema
--  Version 2.0
--
-- ===================================================================================

-- ============================================
-- SECTION 1: CORE ENTITIES & ACCESS CONTROL
-- ============================================

-- Users Table: The central entity for all user accounts.
CREATE TABLE Users (
    user_id BIGSERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    hashed_password TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Roles Table: Defines a set of permissions for different user types.
CREATE TABLE Roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE -- e.g., 'user', 'premium_user', 'coach', 'admin'
);

-- UserRoles Junction Table: Maps users to their roles (many-to-many).
CREATE TABLE UserRoles (
    user_id BIGINT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    role_id INT NOT NULL REFERENCES Roles(role_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

-- Permissions Table: Defines specific actions that can be performed.
CREATE TABLE Permissions (
    permission_id SERIAL PRIMARY KEY,
    permission_name VARCHAR(100) NOT NULL UNIQUE, -- e.g., 'read_financials', 'edit_goals', 'view_all_users'
    description TEXT
);

-- RolePermissions Junction Table: Maps roles to their permissions (many-to-many).
CREATE TABLE RolePermissions (
    role_id INT NOT NULL REFERENCES Roles(role_id) ON DELETE CASCADE,
    permission_id INT NOT NULL REFERENCES Permissions(permission_id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);


-- TimePeriods Table: User-defined periods for tracking metrics and goals.
CREATE TABLE TimePeriods (
    time_period_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    period_label VARCHAR(100) NOT NULL, -- e.g., 'Q1 2025', 'My Japan Trip', 'Marathon Training'
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, period_label),
    CHECK (start_date <= end_date)
);


-- ============================================
-- SECTION 2: METRIC SNAPSHOTS (The Core Data)
-- ============================================

-- FinancialMetrics Table (Color Code: Blue)
CREATE TABLE FinancialMetrics (
    metric_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    time_period_id BIGINT NOT NULL REFERENCES TimePeriods(time_period_id) ON DELETE CASCADE,
    net_income DECIMAL(15, 2) DEFAULT 0.00,
    lifestyle_spend DECIMAL(15, 2) DEFAULT 0.00,
    investment_savings DECIMAL(15, 2) DEFAULT 0.00,
    cumulative_assets DECIMAL(15, 2) DEFAULT 0.00,
    debt_remaining DECIMAL(15, 2) DEFAULT 0.00,
    emergency_fund_months DECIMAL(5, 2) DEFAULT 0.00,
    liquidity_percent DECIMAL(5, 2) DEFAULT 0.00,
    wealth_to_liability_ratio DECIMAL(10, 4), -- Calculated at write time: (cumulative_assets / debt_remaining)
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, time_period_id)
);

-- PsychoBehavioralMetrics Table (Color Code: Yellow)
CREATE TABLE PsychoBehavioralMetrics (
    metric_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    time_period_id BIGINT NOT NULL REFERENCES TimePeriods(time_period_id) ON DELETE CASCADE,
    -- Using integer scales (e.g., 1-10) is often better for analytics than ENUMs
    psychological_state_score INT CHECK (psychological_state_score BETWEEN 1 AND 10), -- e.g., 1=Stressed, 10=Thriving
    behavioral_risk_score INT CHECK (behavioral_risk_score BETWEEN 1 AND 10), -- e.g., 1=High Risk, 10=Low Risk
    self_awareness_score INT CHECK (self_awareness_score BETWEEN 1 AND 10),
    discipline_confidence_score INT CHECK (discipline_confidence_score BETWEEN 1 AND 10),
    sentiment_summary TEXT, -- Could store keywords or a brief summary
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, time_period_id)
);

-- LifestyleMetrics Table (Color Code: Tan/Beige)
CREATE TABLE LifestyleMetrics (
    metric_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    time_period_id BIGINT NOT NULL REFERENCES TimePeriods(time_period_id) ON DELETE CASCADE,
    relationship_readiness_score INT CHECK (relationship_readiness_score BETWEEN 1 AND 10),
    work_life_balance_score INT CHECK (work_life_balance_score BETWEEN 1 AND 10),
    burnout_risk_percent DECIMAL(5, 2) DEFAULT 0.00,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, time_period_id)
);

-- AssetPortfolioMetrics Table (Color Code: Green)
CREATE TABLE AssetPortfolioMetrics (
    metric_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    time_period_id BIGINT NOT NULL REFERENCES TimePeriods(time_period_id) ON DELETE CASCADE,
    equity_percent DECIMAL(5, 2) DEFAULT 0.00,
    debt_percent DECIMAL(5, 2) DEFAULT 0.00,
    gold_percent DECIMAL(5, 2) DEFAULT 0.00,
    cash_liquid_percent DECIMAL(5, 2) DEFAULT 0.00,
    real_estate_percent DECIMAL(5, 2) DEFAULT 0.00,
    crypto_percent DECIMAL(5, 2) DEFAULT 0.00,
    projected_cagr_percent DECIMAL(5, 2) DEFAULT 0.00,
    volatility_risk_score INT CHECK (volatility_risk_score BETWEEN 1 AND 10),
    concentration_risk_score INT CHECK (concentration_risk_score BETWEEN 1 AND 10),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, time_period_id)
);

-- GoalsAndMastery Table (Color Code: Purple)
CREATE TABLE GoalsAndMastery (
    goal_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    time_period_id BIGINT NOT NULL REFERENCES TimePeriods(time_period_id) ON DELETE CASCADE,
    goal_title VARCHAR(255) NOT NULL,
    goal_description TEXT,
    goal_category VARCHAR(100), -- e.g., 'Technical', 'Leadership', 'Personal', 'Financial'
    status VARCHAR(50) NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'achieved', 'abandoned')),
    target_date DATE,
    completion_date DATE,
    progress_percent DECIMAL(5, 2) DEFAULT 0.00 CHECK (progress_percent BETWEEN 0.00 AND 100.00),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ============================================
-- SECTION 3: FEEDBACK & REINFORCEMENT LEARNING
-- ============================================

-- FeedbackHistory Table: The basis for the RLHF control system.
CREATE TABLE FeedbackHistory (
    feedback_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    time_period_id BIGINT NOT NULL REFERENCES TimePeriods(time_period_id) ON DELETE CASCADE,
    metric_type VARCHAR(50) NOT NULL CHECK (metric_type IN ('Financial', 'PsychoBehavioral', 'Lifestyle', 'AssetPortfolio', 'GoalsAndMastery')),
    associated_metric_id BIGINT NOT NULL,
    feedback_source VARCHAR(50) NOT NULL DEFAULT 'user', -- e.g., 'user', 'system', 'coach'
    feedback_score INT CHECK (feedback_score BETWEEN -10 AND 10),
    feedback_text TEXT,
    action_taken TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ============================================
-- SECTION 4: INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX idx_users_email ON Users(email);
CREATE INDEX idx_timeperiods_user ON TimePeriods(user_id);
CREATE INDEX idx_timeperiods_start_date ON TimePeriods(start_date);
CREATE INDEX idx_timeperiods_end_date ON TimePeriods(end_date);
CREATE INDEX idx_financial_metrics_user_period ON FinancialMetrics(user_id, time_period_id);
CREATE INDEX idx_psychobehavioral_metrics_user_period ON PsychoBehavioralMetrics(user_id, time_period_id);
CREATE INDEX idx_lifestyle_metrics_user_period ON LifestyleMetrics(user_id, time_period_id);
CREATE INDEX idx_assetportfolio_metrics_user_period ON AssetPortfolioMetrics(user_id, time_period_id);
CREATE INDEX idx_goalsandmastery_user_period ON GoalsAndMastery(user_id, time_period_id);
CREATE INDEX idx_goalsandmastery_status ON GoalsAndMastery(status);
CREATE INDEX idx_goalsandmastery_category ON GoalsAndMastery(goal_category);
CREATE INDEX idx_feedbackhistory_user_period ON FeedbackHistory(user_id, time_period_id);
CREATE INDEX idx_feedbackhistory_metric_type_id ON FeedbackHistory(metric_type, associated_metric_id);
CREATE INDEX idx_feedbackhistory_source ON FeedbackHistory(feedback_source);
CREATE INDEX idx_userroles_role_id ON UserRoles(role_id);
CREATE INDEX idx_rolepermissions_permission_id ON RolePermissions(permission_id);


-- ============================================
-- SECTION 5: VIEWS FOR SIMPLIFIED REPORTING
-- ============================================

CREATE VIEW V_UserGrowthSummary AS
SELECT
    u.user_id,
    u.username,
    tp.time_period_id,
    tp.period_label,
    tp.start_date,
    tp.end_date,
    fm.net_income,
    fm.cumulative_assets,
    fm.debt_remaining,
    pbm.psychological_state_score,
    pbm.discipline_confidence_score,
    lsm.work_life_balance_score,
    apm.projected_cagr_percent,
    apm.volatility_risk_score
FROM Users u
JOIN TimePeriods tp ON u.user_id = tp.user_id
LEFT JOIN FinancialMetrics fm ON tp.time_period_id = fm.time_period_id
LEFT JOIN PsychoBehavioralMetrics pbm ON tp.time_period_id = pbm.time_period_id
LEFT JOIN LifestyleMetrics lsm ON tp.time_period_id = lsm.time_period_id
LEFT JOIN AssetPortfolioMetrics apm ON tp.time_period_id = apm.time_period_id;
