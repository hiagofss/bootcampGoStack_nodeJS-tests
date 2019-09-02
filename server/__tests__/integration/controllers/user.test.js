import request from 'supertest';
import app from '../../../src/app';

describe('User', () => {
  it('should be able to register', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Hiago Souza',
        email: 'hiagofss98@gmail.com',
        password_hash: '123456789',
      });

    expect(response.body).toHaveProperty('id');
  });
});
