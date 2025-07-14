import request from 'supertest';
import app from '../app'; // ajuste o caminho conforme necessário

const SCHEMA = 'igreja_1751327431755'; // Defina o valor apropriado para o schema
let token: string;

beforeAll(async () => {
  const res = await request(app)
    .post('/api/auth/login')
    .set('schema', SCHEMA)
    .send({ 
      email: 'aldairbarros@eklesia.app.br', 
      senha: 'Alsib@2025' });
  token = res.body.token;
});
it('deve listar igrejas', async () => {
  const res = await request(app)
    .get('/api/igrejas')
    .set('schema', SCHEMA)
    .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});
