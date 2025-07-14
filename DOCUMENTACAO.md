# Documentação da API - Sistema de Tesouraria de Congregações

## Sumário
- [Autenticação](#autenticação)
- [Usuários](#usuários)
- [Congregações](#congregações)
- [Membros](#membros)
- [Ofertas](#ofertas)
- [Despesas](#despesas)
- [Relatórios](#relatórios)
- [Dashboard](#dashboard)
- [Comprovantes (Fotos do Talão)](#comprovantes-fotos-do-talão)
- [Perfis e Permissões](#perfis-e-permissões)
- [Observações Gerais](#observações-gerais)

---

## Autenticação

### Registrar usuário

`POST /auth/register`

**Body:**
```json
{
  "nome": "Admin",
  "email": "admin@teste.com",
  "senha": "123456",
  "perfil": "admin", // "admin", "pastor", "tesoureiro", "dirigente"
  "congregacaoId": 1 // (opcional para admin/pastor)
}
```

### Login

`POST /auth/login`

**Body:**
```json
{
  "email": "admin@teste.com",
  "senha": "123456"
}
```
**Resposta:**  
```json
{
  "token": "JWT_TOKEN",
  "usuario": {
    "id": 1,
    "nome": "Admin",
    "email": "admin@teste.com",
    "perfil": "admin"
  }
}
```

**Use o token JWT no header das próximas requisições:**
```
Authorization: Bearer SEU_TOKEN_AQUI
```

---

## Usuários

### Listar usuários (admin)

`GET /usuarios`

### Criar usuário (admin)

`POST /usuarios`

**Body:**
```json
{
  "nome": "João",
  "email": "joao@teste.com",
  "senha": "123456",
  "perfil": "tesoureiro",
  "congregacaoId": 2
}
```

### Editar usuário (admin)

`PUT /usuarios/:id`

### Deletar usuário (admin)

`DELETE /usuarios/:id`

### Redefinir senha (admin)

`PATCH /usuarios/:id/reset-password`

**Body:**
```json
{
  "novaSenha": "novaSenha123"
}
```

### Trocar a própria senha (usuário autenticado)

`PATCH /usuarios/change-password`

**Body:**
```json
{
  "senhaAtual": "senha_antiga",
  "novaSenha": "nova_senha"
}
```

---

## Congregações

### Listar congregações

`GET /congregacoes`

### Criar congregação

`POST /congregacoes`

---

## Membros

### Listar membros

`GET /membros?congregacaoId=1`

### Criar membro

`POST /membros`

**Body:**
```json
{
  "name": "Maria",
  "congregacaoId": 1
}
```

---

## Ofertas

### Listar ofertas

`GET /ofertas?congregacaoId=1`

### Criar oferta

`POST /ofertas`

**Body:**
```json
{
  "memberId": 1,
  "congregacaoId": 1,
  "type": "dizimo", // ou "oferta"
  "value": 100,
  "date": "2025-06-17",
  "service": "domingo",
  "receiptPhoto": "/uploads/1/2025-6/arquivo.jpg" // opcional
}
```

### Upload de comprovante (foto do talão)

`POST /ofertas/upload-receipt`

**Body (form-data):**
- `congregacaoId`: 1
- `ano`: 2025
- `mes`: 6
- `receiptPhoto`: (arquivo)

**Resposta:**
```json
{
  "filePath": "/uploads/1/2025-6/arquivo.jpg"
}
```

### Atualizar comprovante de uma oferta

`PATCH /ofertas/:id/receipt-photo`

**Body:**
```json
{
  "receiptPhoto": "/uploads/1/2025-6/arquivo.jpg"
}
```

### Excluir comprovante de uma oferta

`DELETE /ofertas/:id/receipt-photo`

---

## Comprovantes (Fotos do Talão)

### Listar comprovantes por congregação e período

`GET /ofertas/receipts?congregacaoId=1&mes=6&ano=2025`

**Resposta:**
```json
[
  {
    "id": 10,
    "memberId": 2,
    "memberName": "Maria",
    "value": 100,
    "date": "2025-06-17T00:00:00.000Z",
    "service": "domingo",
    "receiptPhoto": "/uploads/1/2025-6/arquivo.jpg"
  },
  ...
]
```

---

## Despesas

### Listar despesas

`GET /despesas?congregacaoId=1&mes=6&ano=2025`

### Criar despesa

`POST /despesas`

**Body:**
```json
{
  "congregacaoId": 1,
  "descricao": "Energia elétrica",
  "valor": 150,
  "data": "2025-06-10",
  "categoria": "Luz"
}
```

---

## Relatórios

### Relatório mensal (JSON)

`GET /relatorios/mensal?congregacaoId=1&mes=6&ano=2025`

### Relatório mensal (PDF)

`GET /relatorios/mensal/pdf?congregacaoId=1&mes=6&ano=2025`

---

## Dashboard

### Resumo financeiro anual

`GET /dashboard/resumo?congregacaoId=1&ano=2025`

**Resposta:**
```json
{
  "arrecadacaoPorMes": [1000, 1200, ...],
  "despesasPorMes": [300, 400, ...],
  "totalArrecadadoAno": 15000,
  "totalDespesasAno": 5000,
  "saldoAno": 4500
}
```

---

## Perfis e Permissões

- **admin**: acesso total a todas as rotas e dados.
- **pastor**: acesso a todos os relatórios e congregações.
- **tesoureiro/dirigente**: acesso apenas à própria congregação.
- Todas as rotas protegidas exigem o header `Authorization: Bearer SEU_TOKEN`.

---

## Observações Gerais

- Para upload de arquivos, use `multipart/form-data`.
- As imagens de comprovantes ficam acessíveis em `/uploads/...`.
- Para rodar localmente:
  1. Configure `.env` com as variáveis necessárias.
  2. Rode `npx prisma migrate dev` para criar o banco.
  3. Rode `npm install` e depois `npm run dev` ou `node src/index.js`.
- Use ferramentas como **Insomnia** ou **Postman** para testar as rotas.
