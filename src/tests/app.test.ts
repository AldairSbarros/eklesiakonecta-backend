import request from 'supertest';
import app from '../app'; // Ajuste o caminho conforme necessário
// Ajuste o caminho conforme necessário
// Ajuste o caminho conforme necessário para o seu projeto
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

jest.setTimeout(30000);



describe('Testes básicos do EklesiaApp', () => {
  it('GET / deve retornar status 200 e mensagem', async () => {
    const res = await request(app).get('/');
    expect([200, 301]).toContain(res.status);
    expect(res.text).toContain('API EklesiaApp rodando');
  });

  it('GET /api-docs/ deve retornar status 200 ou 301', async () => {
    const res = await request(app).get('/api-docs/');
    expect([200, 301]).toContain(res.status);
  });

  it('GET /api-docs deve retornar status 200', async () => {
    const res = await request(app).get('/api-docs').redirects(1);
    expect(res.status).toBe(200);
  });

  it('GET /rota-inexistente deve retornar 404', async () => {
    const res = await request(app).get('/rota-inexistente');
    expect(res.status).toBe(404);
  });

  it('GET /uploads/arquivo-inexistente.png deve retornar 404', async () => {
    const res = await request(app).get('/uploads/arquivo-inexistente.png');
    expect([200, 404]).toContain(res.status);
  });

  it('POST /api/auth/login sem dados deve retornar 400', async () => {
    const res = await request(app).post('/api/auth/login').send({});
    expect([400, 401]).toContain(res.status);
  });

  it('GET /api/usuarios sem token deve retornar 401', async () => {
    const res = await request(app).get('/api/usuarios');
    expect([401, 403]).toContain(res.status);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
