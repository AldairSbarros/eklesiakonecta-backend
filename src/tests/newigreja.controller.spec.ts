import request from 'supertest';
import app from '../app'; // ajuste o caminho conforme necessário

const SCHEMA = 'igreja_1751327431755'; // Defina o valor apropriado para o seu caso de uso

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


it('deve cadastrar uma nova igreja', async () => {
  const uniqueSuffix = `${Date.now()}_${Math.floor(Math.random() * 1000000000)}`;
  const email = `igreja${uniqueSuffix}@teste.com`;
  const schemaNovo = `igreja_${uniqueSuffix}`;

  const res = await request(app)
    .post('/api/igrejas')
    .set('schema', 'public') // Use o schema global!
    .set('Authorization', `Bearer ${token}`)
    .send({
      nome: 'Igreja Teste',
      email,
      password: 'SenhaForte123', // Campo obrigatório!
      schema: schemaNovo,        // Campo obrigatório!
      endereco: 'Rua Teste, 123'
    });
expect(res.body).toHaveProperty('igreja');
expect(res.body.igreja).toHaveProperty('id');
});
