const { DataTypes } = require('sequelize');
module.exports = (sequelize) => sequelize.define('TimePeriod', {
  period_label: DataTypes.STRING,
  start_date: DataTypes.DATEONLY,
  end_date: DataTypes.DATEONLY
});
