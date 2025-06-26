const request = require('supertest');
const app = require('../src/app');

describe('Auth Endpoints', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({ username: 'testuser', email: 'test@example.com', password: 'testpass' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
  });

  it('should login and return a token', async () => {
    await request(app)
      .post('/api/v1/auth/register')
      .send({ username: 'testuser2', email: 'test2@example.com', password: 'testpass' });
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'test2@example.com', password: 'testpass' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});
