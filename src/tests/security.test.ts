import request from 'supertest';
import app from '../app';
import { errorMessage } from '@enums/errors.enum';


describe('Tests for Security JWT', () => {
  it('Must fail if no token is provided', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message', errorMessage.noToken);
  });

  it('Must fail if the token is invalid', async () => {
    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', 'Bearer token_invalido');
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message', errorMessage.invalidToken);
  });
});
