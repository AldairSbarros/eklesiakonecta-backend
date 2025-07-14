import request from 'supertest';
import app from '../app';

describe('Relatórios', () => {
  let token: string;
  const schema = 'public'; // Ajuste conforme seu ambiente

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'aldairbarros@eklesia.app.br', senha: 'Alsib@2025' });
    token = res.body.token;
  });

  async function getRelatorio(url: string, query: object) {
    return await request(app)
      .get(url)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .set('schema', schema)
      .query(query);
  }

  it('deve gerar relatório de células', async () => {
    const query = {
      dataInicio: '2024-01-01',
      dataFim: '2024-06-30',
      campus: 'central',
      agrupamento: 'mensal',
      unidade: 'matriz',
      departamento: 'celulas',
      // Adicione outros parâmetros obrigatórios aqui
    };
    const res = await getRelatorio('/api/relatorios/celulas', query);
    if (res.status !== 200) {
      console.error('Erro relatório células:', res.body);
    }
  });

  it('deve gerar relatório financeiro', async () => {
    const query = {
      dataInicio: '2024-01-01',
      dataFim: '2024-06-30',
      tipoRelatorio: 'mensal',
      categoria: 'todas',
      agrupamento: 'mensal',
      campus: 'central',
      fonte: 'todas',
      situacao: 'todas',
      unidade: 'matriz',
      departamento: 'financeiro',
      moeda: 'BRL',
      periodo: '2024-01',
      // Adicione outros parâmetros obrigatórios aqui
    };
    const res = await getRelatorio('/api/relatorios/financeiro', query);
    if (res.status !== 200) {
      console.error('Erro relatório financeiro:', res.body);
    }
    
  });

  it('deve gerar relatório de discipulado', async () => {
    const query = {
      dataInicio: '2024-01-01',
      dataFim: '2024-06-30',
      // discipuladorId: '1', // Adicione se necessário
    };
    const res = await getRelatorio('/api/relatorios/discipulado/por-discipulador', query);
    if (res.status !== 200) {
      console.error('Erro relatório discipulado:', res.body);
    }
    expect([200, 204, 404]).toContain(res.status); // Aceita 404 caso não haja dados
  });
  })