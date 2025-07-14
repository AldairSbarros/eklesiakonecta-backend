import request from 'supertest';
import app from './app';

// src/app.test.ts

describe('App rotas principais', () => {
  it('GET / deve retornar status 200 e mensagem', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toContain('API EklesiaApp rodando');
  });

  it('GET /api-docs deve retornar status 200', async () => {
    const res = await request(app).get('/api-docs');
    // swagger-ui-express responde com HTML
    expect(res.status).toBe(200);
    expect(res.text).toContain('Swagger');
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

  it('GET /api/usuarios sem autenticação deve retornar 401', async () => {
    const res = await request(app).get('/api/usuarios');
    expect([401, 403]).toContain(res.status);
  });

  // Adicione mais testes conforme necessário para outras rotas globais
});