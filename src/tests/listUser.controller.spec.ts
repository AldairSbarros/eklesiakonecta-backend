import request from 'supertest';
import app from '../app';

const SCHEMA = 'igreja_1751327431755';
let token: string;

beforeAll(async () => {
  const res = await request(app)
    .post('/api/auth/login')
    .set('schema', SCHEMA)
    .send({ email: 'admin2@teste.com', senha: '123456' });
  token = res.body.token;
});

it('deve listar usuários', async () => {
  const res = await request(app)
    .get('/api/usuarios')
    .set('schema', SCHEMA)
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});
