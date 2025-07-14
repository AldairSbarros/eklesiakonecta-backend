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

it('deve remover um usuário', async () => {
  // Cria um usuário para remover
  const email = `remove${Date.now()}@teste.com`;
  const resCadastro = await request(app)
    .post('/api/usuarios')
    .set('schema', SCHEMA)
    .set('Authorization', `Bearer ${token}`)
    .send({
      nome: 'Usuário Remove',
      email,
      senha: '123456',
      perfil: 'ADMIN',
      token: process.env.TOKEN_ADMIN
    });
  const userId = resCadastro.body.id;

  // Remove o usuário
  const resDelete = await request(app)
    .delete(`/api/usuarios/${userId}`)
    .set('schema', SCHEMA)
    .set('Authorization', `Bearer ${token}`);

  console.log('Remover:', resDelete.status, resDelete.body);

  expect(resDelete.status).toBe(200);
  expect(resDelete.body.message).toMatch(/removido com sucesso/i);
});
