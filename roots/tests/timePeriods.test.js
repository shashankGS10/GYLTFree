const request = require('supertest');
const app = require('../src/app');

describe('Time Period Endpoints', () => {
  it('should create and fetch time periods', async () => {
    const createRes = await request(app)
      .post('/api/v1/time-periods')
      .send({ period_label: 'Q1 2025', start_date: '2025-01-01', end_date: '2025-03-31' });
    expect(createRes.statusCode).toEqual(200);

    const fetchRes = await request(app).get('/api/v1/time-periods');
    expect(fetchRes.statusCode).toEqual(200);
    expect(Array.isArray(fetchRes.body)).toBe(true);
  });
});
