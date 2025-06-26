const request = require('supertest');
const app = require('../src/app');

describe('Financial Metrics Endpoints', () => {
  it('should create and fetch financial metrics', async () => {
    // Create a time period first
    const period = await request(app)
      .post('/api/v1/time-periods')
      .send({ period_label: 'Q2 2025', start_date: '2025-04-01', end_date: '2025-06-30' });

    const res = await request(app)
      .post('/api/v1/financial-metrics')
      .send({
        timePeriodId: period.body.id,
        net_income: 100000,
        lifestyle_spend: 20000,
        investment_savings: 50000,
        cumulative_assets: 300000,
        debt_remaining: 10000,
        emergency_fund: 15000,
        liquidity_percent: 25.5,
        wealth_to_liability_ratio: '3:1',
        lifestyle_inflation_percent: 2.5,
        tax_savings: 5000
      });
    expect(res.statusCode).toEqual(200);

    const fetchRes = await request(app).get('/api/v1/financial-metrics');
    expect(fetchRes.statusCode).toEqual(200);
    expect(Array.isArray(fetchRes.body)).toBe(true);
  });
});
