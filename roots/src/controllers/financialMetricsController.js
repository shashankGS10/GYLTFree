const { FinancialMetrics } = require('../models/index');

exports.getAll = async (req, res) => {
  const metrics = await FinancialMetrics.findAll();
  res.json(metrics);
};
exports.create = async (req, res) => {
  const metric = await FinancialMetrics.create(req.body);
  res.json(metric);
};
exports.update = async (req, res) => {
  await FinancialMetrics.update(req.body, { where: { id: req.params.id } });
  res.json({ success: true });
};
exports.remove = async (req, res) => {
  await FinancialMetrics.destroy({ where: { id: req.params.id } });
  res.json({ success: true });
};
