require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const timePeriodRoutes = require('./src/routes/timePeriods');
const financialMetricsRoutes = require('./src/routes/financialMetrics');
const routes = require('./src/routes');
const authRoutes = require('./src/routes/auth');
const { sequelize } = require('./src/models');

const app = express();
app.use(bodyParser.json());

// ---- NEW: sync DB before any route is hit ----
sequelize
    .sync({ force: process.env.NODE_ENV === 'test' })
    .then(() => console.log('✅ Database synced'))
    .catch(err => console.error('❌ Failed to sync DB:', err));

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Personal Growth API',
      version: '1.0.0',
      description: 'API documentation for Personal Growth Management System'
    },
    servers: [{ url: 'http://localhost:8000' }]
  },
  apis: ['./src/routes/*.js'] // path to your route files with Swagger comments
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/v1', routes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/time-periods', timePeriodRoutes);
app.use('/api/v1/financial-metrics', financialMetricsRoutes);

app.get('/', (req, res) => res.send('API Running'));
app.get('/ping', (req, res) => {
    res.status(200).json({ message: 'Pong!' });
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;