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

it('deve atualizar um usuário', async () => {
  const email = `update${Date.now()}@teste.com`;
  const resCadastro = await request(app)
    .post('/api/usuarios')
    .set('schema', SCHEMA)
    .set('Authorization', `Bearer ${token}`)
    .send({
      nome: 'Usuário Update',
      email,
      senha: '123456',
      perfil: 'ADMIN',
      token: process.env.TOKEN_ADMIN
    });
  const userId = resCadastro.body.id;

  const resUpdate = await request(app)
    .put(`/api/usuarios/${userId}`)
    .set('schema', SCHEMA)
    .set('Authorization', `Bearer ${token}`)
    .send({ nome: 'Usuário Atualizado' });

  expect(resUpdate.status).toBe(200);
  expect(resUpdate.body.nome).toBe('Usuário Atualizado');
});
