# Checklist de Desenvolvimento - Backend EklesiaApp

## 1. Church Controller (Igrejas)
- [x] Criar igreja e banco de dados dedicado
- [x] Listar todas as igrejas
- [x] Buscar igreja por ID
- [x] Atualizar dados da igreja
- [x] Remover igreja
- [x] Validar campos obrigatórios no cadastro e atualização
- [x] Tratar erros de forma detalhada (ex: banco já existe, e-mail duplicado)
- [x] Permitir definir senha no cadastro
- [x] Adicionar logs para auditoria e debug
- [x] Remover funções exportadas não implementadas
- [x] Adicionar autenticação e autorização nas rotas
- [x] Sanitizar e validar entradas do usuário
- [x] Garantir que o campo `schema` está correto
- [x] Adicionar campo para status da igreja (ativa/inativa)
- [x] Adicionar campo para data de criação
- [x] Criar testes unitários para cada método
- [x] Testar criação de banco e migrations em ambiente de desenvolvimento

## 2. Módulo de Usuários/Admin
- [x] Cadastro, autenticação e login de usuários
- [x] Recuperação e alteração de senha
- [x] Permissões e papéis (admin, gestor, membro, etc)
- [x] Listagem, atualização e remoção de usuários
- [x] Logs de acesso e ações administrativas
- [ ] Testes unitários e de integração

## 3. Módulo de Células
- [x] Cadastro e gerenciamento de células
- [x] Associação de membros a células (via campo `celulaId` em Member)
- [x] Registro de reuniões e frequência
- [x] Relatórios de células
- [ ] Testes unitários

## 4. Módulo de Discipulado
- [x] Cadastro de discipuladores e discipulandos
- [x] Registro de encontros e acompanhamento
- [x] Relatórios de discipulado

## 5. Módulo de Tesouraria/Financeiro
- [x] Cadastro de entradas e saídas financeiras
- [x] Upload de comprovantes
- [ ] Integração com Pix/Mercado Pago
- [x] Relatórios financeiros
- [ ] Testes unitários

## 6. Módulo de Relatórios
- [x] Relatórios de células e financeiros
- [x] Relatórios automáticos por e-mail
- [ ] Relatórios customizáveis por módulo
- [x] Exportação em PDF/Excel

## 7. Módulo de Mensagens/Notificações
- [x] Envio de mensagens internas (mensagens de célula)
- [x] Integração com WhatsApp e e-mail
- [ ] Notificações push (se aplicável)

## 8. Integrações Externas
- [ ] Integração com Zoho Mail (criação de e-mails institucionais)
- [ ] Integração com Mercado Pago/Pix
- [x] Integração com WhatsApp API

## 9. Segurança e Boas Práticas
- [x] Autenticação JWT
- [x] Autorização por perfil/papel
- [x] Validação e sanitização de dados
- [x] Logs de auditoria
- [ ] Rate limiting e proteção contra ataques comuns

## 10. Infraestrutura e Deploy
- [x] Configuração de variáveis de ambiente
- [ ] Scripts de build e deploy automatizado
- [x] Backup automático dos bancos de dados
- [ ] Monitoramento e alertas

## 11. Documentação
- [x] Documentação das rotas (Swagger/OpenAPI)
- [ ] Documentação de instalação e deploy
- [ ] Manual do desenvolvedor

## 12. Testes e Qualidade
- [ ] Testes unitários para todos os módulos
- [ ] Testes de integração
- [ ] Testes automatizados de API
- [ ] Cobertura de testes acima de 80%

## 13. Futuro (pós-MVP)
- [ ] Automatizar criação de e-mail institucional para cada igreja
- [ ] Adicionar logs de auditoria para ações administrativas
- [ ] Dashboard de métricas e uso do sistema
- [ ] Multi-idioma

## 14. Módulo de Transmissões ao Vivo (Lives/Web Rádio)
- [x] Cadastro de transmissões ao vivo (lives) por igreja
- [x] Cadastro de link de rádio web por igreja
- [x] Listagem de transmissões por igreja
- [x] Endpoints REST para criar e listar lives
- [x] Integração multi-schema (cada igreja pode ter suas próprias transmissões)
- [ ] Testes unitários e de integração para o módulo de lives
- [ ] Documentação Swagger dos endpoints de lives
- [ ] Exemplo de embed/player para frontend

---


---

**Dica:**  
Priorize os módulos essenciais para o MVP (igrejas, usuários, células, financeiro).  
Depois, avance para integrações, segurança, testes e automações.

Se quiser detalhar algum módulo ou receber exemplos de código, só pedir.

---

## 1. Integrações Externas Possíveis

### a) Pagamentos e Finanças

- Mercado Pago/Pix: Receber doações, dízimos, mensalidades, eventos.
  - Exemplo: gerar QR Code Pix, consultar status de pagamento, receber notificações de pagamento.
- PagSeguro, Stripe, PayPal: Alternativas para pagamentos online.

### b) Comunicação

- WhatsApp API: Enviar mensagens automáticas para membros (avisos, lembretes de reunião, aniversários).
- E-mail (Zoho, SendGrid, Gmail API): Envio de relatórios, notificações, boletins, recuperação de senha.
- SMS (Twilio, Zenvia): Envio de alertas rápidos para membros.

### c) Documentos e Arquivos

- Google Drive, Dropbox, AWS S3: Armazenar comprovantes, relatórios, documentos da igreja.

### d) Outros

- Google Calendar: Sincronizar eventos e reuniões.
- Power BI/Tableau: Exportar dados para dashboards avançados.

---

## 2. Exemplos de Automações

### a) Rotinas Agendadas (cron jobs)
- [x] Envio automático de relatórios por e-mail (mensal, semanal)
- [ ] Backup automático do banco de dados
- [ ] Limpeza de arquivos temporários/antigos
- [ ] Notificações de aniversariantes do dia

### b) Ações automáticas por evento
- [x] Ao cadastrar um novo membro: enviar e-mail de boas-vindas e WhatsApp
- [ ] Ao registrar uma oferta: enviar recibo automático por e-mail
- [ ] Ao marcar uma reunião: enviar lembrete por WhatsApp/E-mail/SMS

### c) Provisionamento
- [ ] Ao criar uma nova igreja: criar e-mail institucional automaticamente (Zoho, Google Workspace)
- [ ] Ao criar uma célula: gerar grupo de WhatsApp automaticamente (usando WhatsApp Business API)

---

## 3. Sugestões de Arquitetura

- Use filas (RabbitMQ, BullMQ, SQS) para processar tarefas demoradas (envio de e-mails, geração de PDF, integrações externas).
- Use workers/background jobs para automações e rotinas agendadas.
- Centralize integrações externas em services separados (ex: pix.service.ts, whatsapp.service.ts, email.service.ts).
- Utilize webhooks para receber notificações de pagamentos, mensagens, etc.

---

Você está na reta final do MVP do EklesiaApp!

O que já está pronto:
- Funcionalidades essenciais: cadastro e gestão de igrejas, usuários, células, membros, reuniões, financeiro, permissões, autenticação, logs e relatórios básicos.
- Documentação das rotas (Swagger).
- Estrutura de código organizada e modular.

O que falta para fechar o MVP:
- Testes unitários e de integração para garantir qualidade e estabilidade.
- Algumas automações e integrações externas (Pix, WhatsApp, e-mail, etc) ainda não implementadas, mas não são obrigatórias para o MVP.
- Documentação de instalação/deploy e manual do desenvolvedor.
- Melhorias de segurança (rate limiting, monitoramento, backups automáticos).

Resumindo:
Você já tem um backend funcional, pronto para uso real em igrejas, com as principais rotinas do dia a dia.
Agora, o foco deve ser:

- Garantir qualidade (testes)
- Documentar para facilitar manutenção e deploy
- Planejar as próximas integrações e automações para evoluir além do MVP

Parabéns, você está muito próximo de um MVP robusto!