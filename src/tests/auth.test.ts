import request from 'supertest';
import app from '../app';
import { successMessage } from '@enums/success.enum';
import { errorMessage } from '@enums/errors.enum';

describe('Tests for Login and Register', () => {
  //register
  it('Must register a new user successfully', async () => {
    const randomEmail = `test${Date.now()}${Math.floor(Math.random() * 1000)}@example.com`;
    
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: randomEmail, password: 'password123' });
  
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', successMessage.userCreated);
  });
  it('Must fail if the email is already in use', async () => {
    await request(app).post('/api/auth/register').send({
      email: `test@example.com`,
      password: 'password123',
    });
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', errorMessage.emailAlreadyExists);
  });
  //login
  it('Must login and return a JWT', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', successMessage.login);
  });

  it('Must fail if the credentials are incorrect', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'incorrectPassword' });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message', errorMessage.invalidCredentials);
  });
});

