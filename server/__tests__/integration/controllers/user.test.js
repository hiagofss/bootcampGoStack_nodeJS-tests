import request from 'supertest';
import bcrypt from 'bcrypt';
import app from '../../../src/app';

import User from '../../../src/app/models/User';
import truncate from '../../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should encrypt user password when new user created', async () => {
    const user = await User.create({
      name: 'Hiago Souza',
      email: 'hiagofss98@gmail.com',
      password: '123456789',
    });

    const compareHash = await bcrypt.compare('123456789', user.password_hash);

    expect(compareHash).toBe(true);
  });

  it('should be able to register', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Hiago Souza',
        email: 'hiagofss98@gmail.com',
        password: '123456789',
      });

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register with duplicated email', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Hiago Souza',
        email: 'hiagofss98@gmail.com',
        password: '123456789',
      });

    const response = await request(app)
      .post('/users')
      .send({
        name: 'Hiago Souza',
        email: 'hiagofss98@gmail.com',
        password: '123456789',
      });

    expect(response.status).toBe(400);
  });
});
