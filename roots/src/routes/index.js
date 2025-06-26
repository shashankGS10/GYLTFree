// src/app.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('../models/index');

const authRoutes             = require('../routes/auth');
const timePeriodRoutes       = require('../routes/timePeriods');
const financialMetricsRoutes = require('../routes/financialMetrics');

const app = express();
app.use(bodyParser.json());

sequelize
  .sync({ force: process.env.NODE_ENV === 'test' })
  .then(() => console.log('✅ Database synced'))
  .catch(err => console.error('❌ DB sync error', err));

// MOUNT YOUR ROUTES HERE
app.use('/api/v1/auth',           authRoutes);
app.use('/api/v1/time-periods',   timePeriodRoutes);
app.use('/api/v1/financial-metrics', financialMetricsRoutes);

app.get('/', (req, res) => res.send('API Running'));
module.exports = app;
