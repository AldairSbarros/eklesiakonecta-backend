import request from 'supertest';
import app from '../app'; // ajuste o caminho conforme necessário

const SCHEMA = 'igreja_1751327431755'; // Defina o valor apropriado para o seu caso de uso

// Defina o token de autenticação válido para os testes
let token = '';
beforeAll(async () => {
  const res = await request(app)
    .post('/api/auth/login')
    .set('schema', SCHEMA)
    .send({ 
      email: 'aldairbarros@eklesia.app.br',
      senha: 'Alsib@2025' });
  token = res.body.token;
});

it('deve atualizar uma igreja', async () => {
  const email = `igreja${Date.now()}@teste.com`;
  const resCadastro = await request(app)
    .post('/api/igrejas')
    .set('schema', SCHEMA)
    .set('Authorization', `Bearer ${token}`)
    .send({
      nome: 'Igreja Update',
      email,
      endereco: 'Rua Original'
    });
  const igrejaId = resCadastro.body.igreja.id; // <-- Corrigido!
  const newSchema = resCadastro.body.igreja.schema; // <-- Se necessário

  const resUpdate = await request(app)
  .put(`/api/igrejas/${igrejaId}`)
  .set('schema', newSchema)
  .set('Authorization', `Bearer ${token}`)
  .send({
    nome: 'Igreja Atualizada',
    email, // reutilize o mesmo email
    schema: newSchema // pode ser obrigatório
  });
console.log('UPDATE RESPONSE:', resUpdate.status, resUpdate.body);

  expect(resUpdate.status).toBe(200);
  expect(resUpdate.body.nome).toBe('Igreja Atualizada');
});
