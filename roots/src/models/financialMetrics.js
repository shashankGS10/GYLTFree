const { DataTypes } = require('sequelize');
module.exports = (sequelize) => sequelize.define('FinancialMetrics', {
  net_income: DataTypes.DECIMAL,
  lifestyle_spend: DataTypes.DECIMAL,
  investment_savings: DataTypes.DECIMAL,
  cumulative_assets: DataTypes.DECIMAL,
  debt_remaining: DataTypes.DECIMAL,
  emergency_fund: DataTypes.DECIMAL,
  liquidity_percent: DataTypes.DECIMAL,
  wealth_to_liability_ratio: DataTypes.STRING,
  lifestyle_inflation_percent: DataTypes.DECIMAL,
  tax_savings: DataTypes.DECIMAL
});
