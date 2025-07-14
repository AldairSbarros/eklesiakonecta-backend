# Eklesia Konecta - Backend

Backend completo para gestão de igrejas, congregações, células, discipulado, financeiro e relatórios.

## Funcionalidades Principais

- Cadastro e gestão de igrejas/congregações
- Gestão de usuários, permissões e autenticação JWT
- Módulo de células e discipulado
- Controle financeiro (ofertas, despesas, relatórios)
- Dashboard financeiro anual
- Upload e gestão de comprovantes
- Notificações por e-mail e WhatsApp
- Relatórios em JSON e PDF
- Testes automatizados (Jest/Supertest)
- Documentação automática (Swagger)

## Instalação

```bash
git clone https://github.com/seuusuario/eklesia-konecta.git
cd eklesia-konecta/backend
npm install
```

## Configuração

- Crie um arquivo `.env` com as variáveis de ambiente necessárias (veja exemplo em `.env.example`).

## Banco de Dados

- Rode as migrations:
  ```bash
  npx prisma migrate dev
  ```

## Rodando em Desenvolvimento

```bash
npm run dev
```

## Rodando Testes

```bash
npm run test
```

## Deploy

1. Faça o clone do projeto do GitHub no servidor.
2. Configure o arquivo `.env` com as variáveis de produção.
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Rode as migrations do banco:
   ```bash
   npx prisma migrate deploy
   ```
5. Inicie o servidor:
   ```bash
   npm start
   ```
6. Acesse a documentação da API em `/api-docs`.

## Documentação da API

Acesse `/api-docs` após iniciar o servidor para ver a documentação Swagger.

Para exemplos detalhados de uso de cada endpoint, consulte o arquivo [`DOCUMENTACAO.md`](./src/docs/DOCUMENTACAO.md).

---

**Dúvidas?**  
Abra uma issue ou consulte a documentação detalhada no repositório.