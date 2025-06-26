const { TimePeriod } = require('../models/index');

exports.getAll = async (req, res) => {
  const periods = await TimePeriod.findAll();
  res.json(periods);
};
exports.create = async (req, res) => {
  const period = await TimePeriod.create(req.body);
  res.json(period);
};
exports.update = async (req, res) => {
  await TimePeriod.update(req.body, { where: { id: req.params.id } });
  res.json({ success: true });
};
exports.remove = async (req, res) => {
  await TimePeriod.destroy({ where: { id: req.params.id } });
  res.json({ success: true });
};
