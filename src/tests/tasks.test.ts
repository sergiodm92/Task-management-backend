import request from 'supertest';
import app from '../app';

let token: string;

const randomEmail = `test${Date.now()}${Math.floor(Math.random() * 1000)}@example.com`;

beforeAll(async () => {
  await request(app).post('/api/auth/register').send({
    email: randomEmail,
    password: 'password123',
  });
  const res = await request(app)
    .post('/api/auth/login')
    .send({ email: randomEmail, password: 'password123' });
  token = res.body.data.token;
});

describe('Tests for Tasks endpoints', () => {
  //validations
  it('Must fail if the title is not provided', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', "title is required, title must be a string");
  });
  it('Must fail if the title is not a string', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 123,
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', "title must be a string");
  });
  it('Must fail if the dueDate is not a dateString', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: "Task title",
        dueDate: "invalid date",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', "dueDate must be a valid ISO 8601 date string");
  });

  //CRUD tests
  it('Must create a new task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'New task' });

    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty('title', 'New task');
  });

  it('Must get a list of tasks', async () => {
    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    if (res.body.data.length > 0) {
      expect(res.body.data[0]).toHaveProperty('id');
      expect(res.body.data[0]).toHaveProperty('title');
    }
  });

  it('Must delete a task', async () => {
    const taskRes = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Task to delete' });

    const taskId = taskRes.body.data.id;
    expect(taskId).toBeDefined();

    const res = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(204);
  });
});
