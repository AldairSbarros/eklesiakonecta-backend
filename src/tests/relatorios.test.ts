import request from 'supertest';
import app from '../app';

describe('Relatórios', () => {
  let token: string;

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'aldairbarros@eklesia.app.br', senha: 'Alsib@2025' });
    token = res.body.token;
  });

  it('deve gerar relatório de células', async () => {
    const res = await request(app)
      .get('/api/relatorios/celulas')
      .query({ dataInicio: '2024-01-01', dataFim: '2024-06-30' }) // Parâmetros obrigatórios adicionados
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'); // Ensure correct content type
    expect(res.status).toBe(200);
  });

  it('deve gerar relatório financeiro', async () => {
    const res = await request(app)
      .get('/api/relatorios/financeiro')
      .query({ /* Adicione os parâmetros obrigatórios aqui, por exemplo: dataInicio: '2024-01-01', dataFim: '2024-06-30' */ })
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
  });

  it('deve gerar relatório de discipulado', async () => {
    const res = await request(app)
      .get('/api/relatorios/discipulado/por-discipulador')
      .query({ dataInicio: '2024-01-01', dataFim: '2024-06-30' }) // Adiciona parâmetros obrigatórios
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
  });
});
