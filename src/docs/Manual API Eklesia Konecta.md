# Manual da API Eklesia Konecta – Exemplos de Todos os Endpoints

---

## Autenticação

### Login

**POST** `/auth/login`

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
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": 1,
    "nome": "Admin",
    "email": "admin@teste.com",
    "perfil": "admin"
  }
}
```

---

## Usuários

### Listar usuários

**GET** `/usuarios`

**Resposta:**
```json
[
  {
    "id": 1,
    "nome": "Admin",
    "email": "admin@teste.com",
    "perfil": "admin"
  }
]
```

### Criar usuário

**POST** `/usuarios`

**Body:**
```json
{
  "nome": "Novo Usuário",
  "email": "novo@teste.com",
  "perfil": "admin"
}
```
**Resposta:**
```json
{
  "id": 2,
  "nome": "Novo Usuário",
  "email": "novo@teste.com",
  "perfil": "admin"
}
```

---

## Congregações

### Listar congregações

**GET** `/congregacoes`

**Resposta:**
```json
[
  {
    "id": 1,
    "nome": "Congregação Central",
    "email": "central@igreja.com",
    "banco": "igreja_1719000000000",
    "createdAt": "2025-06-22T12:00:00.000Z"
  }
]
```

### Criar congregação

**POST** `/congregacoes`

**Body:**
```json
{
  "nome": "Nova Congregação",
  "email": "nova@igreja.com",
  "banco": "igreja_1719000000001"
}
```
**Resposta:**
```json
{
  "id": 2,
  "nome": "Nova Congregação",
  "email": "nova@igreja.com",
  "banco": "igreja_1719000000001",
  "createdAt": "2025-06-22T12:00:00.000Z"
}
```

---

## Membros

### Listar membros

**GET** `/membros`

**Resposta:**
```json
[
  {
    "id": 1,
    "nome": "João",
    "email": "joao@email.com",
    "telefone": "11999999999",
    "whatsapp": "+5511999999999",
    "congregacaoId": 1
  }
]
```

### Criar membro

**POST** `/membros`

**Body:**
```json
{
  "nome": "Maria Souza",
  "email": "maria@email.com",
  "telefone": "11988887777",
  "whatsapp": "+5511988887777",
  "congregacaoId": 1
}
```
**Resposta:**
```json
{
  "id": 2,
  "nome": "Maria Souza",
  "email": "maria@email.com",
  "telefone": "11988887777",
  "whatsapp": "+5511988887777",
  "congregacaoId": 1
}
```

---

## Ofertas

### Listar ofertas

**GET** `/ofertas`

**Resposta:**
```json
[
  {
    "id": 1,
    "memberId": 1,
    "congregacaoId": 1,
    "type": "dizimo",
    "value": 100,
    "date": "2025-06-22T12:00:00.000Z",
    "service": "Culto Domingo",
    "receiptPhoto": null,
    "numeroRecibo": "123"
  }
]
```

### Criar oferta

**POST** `/ofertas`

**Body:**
```json
{
  "memberId": 1,
  "congregacaoId": 1,
  "type": "dizimo",
  "value": 150,
  "date": "2025-07-01T10:00:00.000Z",
  "service": "Culto Quarta",
  "receiptPhoto": null,
  "numeroRecibo": "124"
}
```
**Resposta:**
```json
{
  "id": 2,
  "memberId": 1,
  "congregacaoId": 1,
  "type": "dizimo",
  "value": 150,
  "date": "2025-07-01T10:00:00.000Z",
  "service": "Culto Quarta",
  "receiptPhoto": null,
  "numeroRecibo": "124"
}
```

---

## Despesas

### Listar despesas

**GET** `/despesas`

**Resposta:**
```json
[
  {
    "id": 1,
    "descricao": "Conta de luz",
    "valor": 200,
    "data": "2025-06-22T12:00:00.000Z",
    "categoria": "Energia",
    "codigoManual": "D001",
    "notaFiscalFoto": null,
    "congregacaoId": 1
  }
]
```

### Criar despesa

**POST** `/despesas`

**Body:**
```json
{
  "descricao": "Água",
  "valor": 150,
  "data": "2025-07-01T10:00:00.000Z",
  "categoria": "Água",
  "codigoManual": "D002",
  "notaFiscalFoto": null,
  "congregacaoId": 1
}
```
**Resposta:**
```json
{
  "id": 2,
  "descricao": "Água",
  "valor": 150,
  "data": "2025-07-01T10:00:00.000Z",
  "categoria": "Água",
  "codigoManual": "D002",
  "notaFiscalFoto": null,
  "congregacaoId": 1
}
```

---

## Receitas

### Listar receitas

**GET** `/receitas`

**Resposta:**
```json
[
  {
    "id": 1,
    "descricao": "Doação especial",
    "valor": 500,
    "data": "2025-06-22T12:00:00.000Z",
    "categoria": "Doação",
    "codigoManual": "R001",
    "congregacaoId": 1
  }
]
```

### Criar receita

**POST** `/receitas`

**Body:**
```json
{
  "descricao": "Venda de livros",
  "valor": 300,
  "data": "2025-07-01T10:00:00.000Z",
  "categoria": "Venda",
  "codigoManual": "R002",
  "congregacaoId": 1
}
```
**Resposta:**
```json
{
  "id": 2,
  "descricao": "Venda de livros",
  "valor": 300,
  "data": "2025-07-01T10:00:00.000Z",
  "categoria": "Venda",
  "codigoManual": "R002",
  "congregacaoId": 1
}
```

---

## Investimentos

### Listar investimentos

**GET** `/investimentos`

**Resposta:**
```json
[
  {
    "id": 1,
    "descricao": "Compra de cadeiras",
    "valor": 1000,
    "data": "2025-06-22T12:00:00.000Z",
    "categoria": "Equipamentos",
    "codigoManual": "I001",
    "congregacaoId": 1
  }
]
```

### Criar investimento

**POST** `/investimentos`

**Body:**
```json
{
  "descricao": "Compra de microfone",
  "valor": 500,
  "data": "2025-07-01T10:00:00.000Z",
  "categoria": "Equipamentos",
  "codigoManual": "I002",
  "congregacaoId": 1
}
```
**Resposta:**
```json
{
  "id": 2,
  "descricao": "Compra de microfone",
  "valor": 500,
  "data": "2025-07-01T10:00:00.000Z",
  "categoria": "Equipamentos",
  "codigoManual": "I002",
  "congregacaoId": 1
}
```

---

## Mensagens de Célula

### Listar mensagens

**GET** `/mensagens-celula`

**Resposta:**
```json
[
  {
    "id": 1,
    "titulo": "A fé que move montanhas",
    "conteudo": "Texto da mensagem...",
    "data": "2025-06-22T12:00:00.000Z"
  }
]
```

### Criar mensagem

**POST** `/mensagens-celula`

**Body:**
```json
{
  "titulo": "Perseverança",
  "conteudo": "Mensagem sobre perseverança...",
  "data": "2025-07-01T10:00:00.000Z"
}
```
**Resposta:**
```json
{
  "id": 2,
  "titulo": "Perseverança",
  "conteudo": "Mensagem sobre perseverança...",
  "data": "2025-07-01T10:00:00.000Z"
}
```

### Atualizar mensagem

**PUT** `/mensagens-celula/2`

**Body:**
```json
{
  "titulo": "Perseverança Atualizada",
  "conteudo": "Novo conteúdo...",
  "data": "2025-07-01T10:00:00.000Z"
}
```
**Resposta:**
```json
{
  "id": 2,
  "titulo": "Perseverança Atualizada",
  "conteudo": "Novo conteúdo...",
  "data": "2025-07-01T10:00:00.000Z"
}
```

### Remover mensagem

**DELETE** `/mensagens-celula/2`

**Resposta:**
- 204 No Content

---

## Igrejas

### Listar igrejas

**GET** `/igrejas`

**Resposta:**
```json
[
  {
    "id": 1,
    "nome": "Igreja Central",
    "email": "central@igreja.com",
    "banco": "igreja_1719000000000",
    "createdAt": "2025-06-22T12:00:00.000Z"
  }
]
```

### Criar igreja

**POST** `/igrejas`

**Body:**
```json
{
  "nome": "Igreja Nova",
  "email": "nova@igreja.com",
  "banco": "igreja_1719000000002"
}
```
**Resposta:**
```json
{
  "id": 2,
  "nome": "Igreja Nova",
  "email": "nova@igreja.com",
  "banco": "igreja_1719000000002",
  "createdAt": "2025-07-01T10:00:00.000Z"
}
```

### Buscar igreja por ID

**GET** `/igrejas/1`

**Resposta:**
```json
{
  "id": 1,
  "nome": "Igreja Central",
  "email": "central@igreja.com",
  "banco": "igreja_1719000000000",
  "createdAt": "2025-06-22T12:00:00.000Z"
}
```

### Atualizar igreja

**PUT** `/igrejas/1`

**Body:**
```json
{
  "nome": "Igreja Central Atualizada",
  "email": "central@igreja.com",
  "banco": "igreja_1719000000000"
}
```
**Resposta:**
```json
{
  "id": 1,
  "nome": "Igreja Central Atualizada",
  "email": "central@igreja.com",
  "banco": "igreja_1719000000000",
  "createdAt": "2025-06-22T12:00:00.000Z"
}
```

### Remover igreja

**DELETE** `/igrejas/1`

**Resposta:**
- 204 No Content

---

## Notificações

### Enviar WhatsApp

**POST** `/notificacoes/whatsapp`

**Body:**
```json
{
  "numero": "+5511999999999",
  "mensagem": "Bem-vindo ao EklesiaApp!"
}
```
**Resposta:**
```json
{
  "status": "Mensagem enviada com sucesso"
}
```

### Enviar E-mail

**POST** `/notificacoes/email`

**Body:**
```json
{
  "to": "joao@email.com",
  "subject": "Bem-vindo!",
  "html": "<b>Seja bem-vindo ao EklesiaApp!</b>"
}
```
**Resposta:**
```json
{
  "status": "E-mail enviado com sucesso"
}
```

---

## Como usar no Insomnia

1. Crie uma nova requisição.
2. Escolha o método (GET, POST, etc).
3. Cole a URL (ex: `http://localhost:3000/membros`).
4. Para POST/PUT, selecione Body > JSON e cole o exemplo acima.
5. Para rotas protegidas, adicione o token JWT no header:
   ```
   Authorization: Bear<vscode_annotation details='%5B%7B%22title%22%3A%22hardcoded