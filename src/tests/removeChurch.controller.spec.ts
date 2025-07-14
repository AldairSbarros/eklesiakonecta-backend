import request from 'supertest';
import app from '../app'; // ajuste o caminho conforme necessário para importar seu app Express

// Defina o valor de SCHEMA conforme necessário para seu ambiente de testes
const SCHEMA = 'igreja_1751327431755';
let token: string;

beforeAll(async () => {
  const res = await request(app)
    .post('/api/auth/login')
    .set('schema', SCHEMA)
    .send({ email: 'aldairbarros@eklesia.app.br', senha: 'Alsib@2025' });
  token = res.body.token;
});
it('deve remover uma igreja', async () => {
  const email = `igreja${Date.now()}@teste.com`;
  const resCadastro = await request(app)
    .post('/api/igrejas')
    .set('schema', SCHEMA)
    .set('Authorization', `Bearer ${token}`)
    .send({
      nome: 'Igreja Remove',
      email,
      endereco: 'Rua Remover'
    });
  const igrejaId = resCadastro.body.igreja.id; // <-- Corrigido!
  const newSchema = resCadastro.body.igreja.schema;

  const resDelete = await request(app)
    .delete(`/api/igrejas/${igrejaId}`)
    .set('schema', newSchema) // <-- Use o schema da igreja criada
    .set('Authorization', `Bearer ${token}`);

  expect(resDelete.status).toBe(200);
  expect(resDelete.body.message).toMatch(/removida com sucesso/i);
});
