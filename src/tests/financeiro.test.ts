import request from 'supertest';
import app from '../app';

describe('Financeiro', () => {
  let token: string;
  let schemaCliente: string;
  let churchId: number;
  let congregacaoId: number;
  let memberId: number;

  beforeAll(async () => {
    // Login no schema global com usuário correto
    const loginRes = await request(app)
      .post('/api/auth/login')
      .set('schema', 'public')
      .send({ email: 'aldairbarros@eklesia.app.br', senha: 'Alsib@2025' });
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
    churchId = resIgreja.body.igreja.id;

    // Crie uma congregação no novo schema
    const resCong = await request(app)
      .post('/api/congregacoes')
      .set('schema', schemaCliente)
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: 'Congregação Teste', churchId, endereco: 'Rua Teste' });
    congregacaoId = resCong.body.id;

    // Crie um membro no novo schema
    const resMembro = await request(app)
      .post('/api/membros')
      .set('schema', schemaCliente)
      .set('Authorization', `Bearer ${token}`)
      .send({
        nome: 'Membro Teste',
        email: `membro${Date.now()}@teste.com`,
        congregacaoId
      });
    memberId = resMembro.body.id;
  }, 30000); // Increased timeout to 30 seconds

  it('deve cadastrar uma oferta', async () => {
    const res = await request(app)
      .post('/api/offerings')
      .set('schema', schemaCliente)
      .set('Authorization', `Bearer ${token}`)
      .send({
        type: 'dizimo',
        valor: 100,
        data: new Date().toISOString(),
        congregacaoId,
        memberId
      });
    console.log('OFFERING RESPONSE:', res.status, res.body);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('deve listar ofertas', async () => {
    const res = await request(app)
      .get('/api/offerings')
      .set('schema', schemaCliente)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
