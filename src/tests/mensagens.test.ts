import request from 'supertest';
import app from '../app';

describe('Mensagens API', () => {
  jest.setTimeout(30000); // Increase timeout to 30 seconds
  let token: string;
  let celulaId: number;
  let schemaCliente: string;
  let churchId: number;
  let congregacaoId: number;

  beforeAll(async () => {
    // Login no schema global com usuário correto
    const loginRes = await request(app)
      .post('/api/auth/login')
      .set('schema', 'public')
      .send({ email: 'aldairbarros@eklesia.app.br', senha: 'Alsib@2025' });

    console.log('LOGIN RESPONSE:', loginRes.status, loginRes.body);
    expect(loginRes.body.token).toBeDefined();
    token = loginRes.body.token;

    // Crie uma igreja no schema global
    const email = `igreja${Date.now()}@teste.com`;
    schemaCliente = `igreja_${Date.now()}`;
    const resIgreja = await request(app)
      .post('/api/igrejas')
      .set('schema', 'public')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nome: 'Igreja Teste',
        email,
        password: 'SenhaForte123',
        schema: schemaCliente,
        endereco: 'Rua Teste, 123'
      });

    console.log('RES IGREJA:', resIgreja.status, resIgreja.body);
    expect(resIgreja.body.igreja).toBeDefined();
    churchId = resIgreja.body.igreja.id;

    // Crie uma congregação no novo schema
    const resCong = await request(app)
      .post('/api/congregacoes')
      .set('schema', schemaCliente)
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: 'Congregação Teste', churchId, endereco: 'Rua Teste' });

    expect(resCong.body.id).toBeDefined();
    congregacaoId = resCong.body.id;

    // Crie uma célula no novo schema
    const resCelula = await request(app)
      .post('/api/celulas')
      .set('schema', schemaCliente)
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: 'Célula Mensagem Teste', congregacaoId });

    expect(resCelula.body.id).toBeDefined();
    celulaId = resCelula.body.id;
  });

  it('deve enviar mensagem interna para célula', async () => {
  const res = await request(app)
    .post('/api/mensagens-celula')
    .set('schema', schemaCliente)
    .set('Authorization', `Bearer ${token}`)
    .send({ titulo: 'Aviso', conteudo: 'Reunião amanhã!' }); // Remova celulaId!
  console.log('STATUS RECEBIDO:', res.status);
  console.log('RES BODY:', res.body);
  expect(res.status === 200 || res.status === 201).toBe(true);
  expect(res.body).toHaveProperty('id');
});
});
