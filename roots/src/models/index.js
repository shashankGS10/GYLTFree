// roots/src/models/index.js
const sequelize = require('../configs/database');
sequelize.sync({ alter: true })
  .then(() => console.log('DB Synced'))
  .catch(console.error);
// import model factories
const User           = require('./user')(sequelize);
const TimePeriod     = require('./timePeriod')(sequelize);
const FinancialMetrics = require('./financialMetrics')(sequelize);

if (process.env.SHOULD_SYNC === 'true') {
    sequelize.sync({ alter: true })
      .then(() => console.log('DB Synced'))
      .catch(console.error);
  } else {
    console.log('DB Sync skipped - assuming schema exists');
  }

// set up associations
User.hasMany(TimePeriod,       { foreignKey: 'userId' });
TimePeriod.belongsTo(User,     { foreignKey: 'userId' });

User.hasMany(FinancialMetrics, { foreignKey: 'userId' });
FinancialMetrics.belongsTo(User, { foreignKey: 'userId' });

TimePeriod.hasMany(FinancialMetrics, { foreignKey: 'timePeriodId' });
FinancialMetrics.belongsTo(TimePeriod, { foreignKey: 'timePeriodId' });

module.exports = { sequelize, User, TimePeriod, FinancialMetrics };
