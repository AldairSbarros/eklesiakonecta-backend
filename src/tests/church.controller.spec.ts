// church.controller.spec.ts
import request from 'supertest';
import app from '../app';

const SCHEMA = 'igreja_1751327431755';
let token: string;

beforeAll(async () => {
  // Faça login e pegue o token de admin
  const res = await request(app)
    .post('/api/auth/login')
    .set('schema', SCHEMA)
    .send({ email: 'aldairbarros@eklesia.app.br', senha: 'Alsib@2025' });
  token = res.body.token;
});

describe('Church Controller', () => {
  it('deve criar uma igreja', async () => {
    const res = await request(app)
      .post('/api/igrejas')
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: 'Igreja Teste', email: `igreja${Date.now()}@teste.com` });
    expect(res.status).toBe(201);
    expect(res.body.igreja).toHaveProperty('id');
  });

  it('deve listar igrejas', async () => {
    const res = await request(app)
      .get('/api/igrejas')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
