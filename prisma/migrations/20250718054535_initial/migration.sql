-- CreateEnum
CREATE TYPE "PerfilUsuario" AS ENUM ('ADMIN', 'Dirigente', 'Tesoureiro', 'Secretario', 'Pastor');

-- CreateTable
CREATE TABLE "DevUser" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "perfil" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "DevUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Church" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "logo" TEXT,
    "schema" TEXT NOT NULL,
    "enderecoId" INTEGER,
    "pastorPrincipalId" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'ativa',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,

    CONSTRAINT "Church_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pastor" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT,

    CONSTRAINT "Pastor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Congregacao" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "churchId" INTEGER NOT NULL,
    "endereco" TEXT NOT NULL,
    "telefone" TEXT,
    "pastorDirigenteId" INTEGER,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,

    CONSTRAINT "Congregacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ministerio" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "congregacaoId" INTEGER NOT NULL,
    "liderId" INTEGER,

    CONSTRAINT "Ministerio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MinisterioLocal" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "congregacaoId" INTEGER NOT NULL,

    CONSTRAINT "MinisterioLocal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EscolaLideresTurma" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "congregacaoId" INTEGER NOT NULL,

    CONSTRAINT "EscolaLideresTurma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EscolaLideresModulo" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "turmaId" INTEGER NOT NULL,

    CONSTRAINT "EscolaLideresModulo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EscolaLideresLicao" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "etapaId" INTEGER NOT NULL,

    CONSTRAINT "EscolaLideresLicao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Encontro" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "congregacaoId" INTEGER NOT NULL,

    CONSTRAINT "Encontro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Member" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT,
    "email" TEXT,
    "senha" TEXT,
    "congregacaoId" INTEGER NOT NULL,
    "celulaId" INTEGER,
    "dataNascimento" TIMESTAMP(3),
    "whatsapp" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "discipuladorId" INTEGER,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnderecoMembro" (
    "id" SERIAL NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "memberId" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,

    CONSTRAINT "EnderecoMembro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "perfil" "PerfilUsuario" NOT NULL,
    "congregacaoId" INTEGER,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "tokenTemporario" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "whatsapp" TEXT,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Offering" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "service" TEXT,
    "receiptPhoto" TEXT,
    "numeroRecibo" TEXT,
    "congregacaoId" INTEGER NOT NULL,
    "memberId" INTEGER NOT NULL,
    "usuarioId" INTEGER,

    CONSTRAINT "Offering_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Despesa" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "categoria" TEXT,
    "observacao" TEXT,
    "notaFiscalFoto" TEXT,
    "codigoManual" TEXT,
    "congregacaoId" INTEGER NOT NULL,

    CONSTRAINT "Despesa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Receita" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "categoria" TEXT,
    "observacao" TEXT,
    "codigoManual" TEXT,
    "congregacaoId" INTEGER NOT NULL,

    CONSTRAINT "Receita_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Investimento" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "categoria" TEXT,
    "codigoManual" TEXT,
    "congregacaoId" INTEGER NOT NULL,

    CONSTRAINT "Investimento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Celula" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" TEXT,
    "liderId" INTEGER,
    "anfitriaoId" INTEGER,
    "congregacaoId" INTEGER NOT NULL,
    "local" TEXT,
    "diaSemana" TEXT,
    "horario" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,

    CONSTRAINT "Celula_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReuniaoCelula" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "tema" TEXT NOT NULL,
    "celulaId" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,

    CONSTRAINT "ReuniaoCelula_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PresencaCelula" (
    "id" SERIAL NOT NULL,
    "membroId" INTEGER NOT NULL,
    "reuniaoId" INTEGER NOT NULL,
    "presente" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PresencaCelula_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisitanteCelula" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "reuniaoId" INTEGER NOT NULL,

    CONSTRAINT "VisitanteCelula_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MensagemCelula" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MensagemCelula_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permissao" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Permissao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsuarioPermissao" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "permissaoId" INTEGER NOT NULL,

    CONSTRAINT "UsuarioPermissao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notificacao" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER,
    "titulo" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notificacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Webhook" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "recebidoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Webhook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TokenRecuperacaoSenha" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TokenRecuperacaoSenha_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Arquivo" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioId" INTEGER,

    CONSTRAINT "Arquivo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Log" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "acao" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "detalhes" TEXT,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sermao" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "textoBase" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pastorId" INTEGER NOT NULL,
    "igrejaId" INTEGER NOT NULL,

    CONSTRAINT "Sermao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnderecoIgreja" (
    "id" SERIAL NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,

    CONSTRAINT "EnderecoIgreja_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Venda" (
    "id" SERIAL NOT NULL,
    "churchId" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valor" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "tipoPlano" TEXT NOT NULL,
    "descricao" TEXT,
    "gateway" TEXT,
    "externalId" TEXT,
    "vencimento" TIMESTAMP(3),
    "renovacaoAuto" BOOLEAN NOT NULL DEFAULT false,
    "upgradeDeId" INTEGER,
    "observacao" TEXT,

    CONSTRAINT "Venda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fatura" (
    "id" SERIAL NOT NULL,
    "vendaId" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valor" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "gateway" TEXT,
    "externalId" TEXT,
    "vencimento" TIMESTAMP(3),
    "observacao" TEXT,

    CONSTRAINT "Fatura_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogAcesso" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER,
    "acao" TEXT NOT NULL,
    "detalhes" TEXT,
    "ip" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LogAcesso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConfigEmail" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "smtpHost" TEXT NOT NULL,
    "smtpPort" INTEGER NOT NULL,
    "smtpUser" TEXT NOT NULL,
    "smtpPass" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "ConfigEmail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Auditoria" (
    "id" SERIAL NOT NULL,
    "acao" TEXT NOT NULL,
    "usuarioId" INTEGER,
    "superuser" BOOLEAN NOT NULL DEFAULT false,
    "detalhes" TEXT,
    "dataHora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Auditoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Encontros" (
    "id" SERIAL NOT NULL,
    "discipuladorId" INTEGER NOT NULL,
    "discipulandoId" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "assunto" TEXT,
    "observacoes" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Encontros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LiveStream" (
    "id" SERIAL NOT NULL,
    "churchId" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "url" TEXT NOT NULL,
    "agendadaEm" TIMESTAMP(3),
    "criadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LiveStream_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TurmaAlunos" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_TurmaAlunos_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_EncontroParticipantes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_EncontroParticipantes_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_MinisterioMembros" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_MinisterioMembros_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_MinisterioLocalMembros" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_MinisterioLocalMembros_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "DevUser_email_key" ON "DevUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Church_schema_key" ON "Church"("schema");

-- CreateIndex
CREATE UNIQUE INDEX "EnderecoMembro_memberId_key" ON "EnderecoMembro"("memberId");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PresencaCelula_reuniaoId_membroId_key" ON "PresencaCelula"("reuniaoId", "membroId");

-- CreateIndex
CREATE UNIQUE INDEX "Permissao_nome_key" ON "Permissao"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "TokenRecuperacaoSenha_token_key" ON "TokenRecuperacaoSenha"("token");

-- CreateIndex
CREATE UNIQUE INDEX "ConfigEmail_clienteId_key" ON "ConfigEmail"("clienteId");

-- CreateIndex
CREATE INDEX "_TurmaAlunos_B_index" ON "_TurmaAlunos"("B");

-- CreateIndex
CREATE INDEX "_EncontroParticipantes_B_index" ON "_EncontroParticipantes"("B");

-- CreateIndex
CREATE INDEX "_MinisterioMembros_B_index" ON "_MinisterioMembros"("B");

-- CreateIndex
CREATE INDEX "_MinisterioLocalMembros_B_index" ON "_MinisterioLocalMembros"("B");

-- AddForeignKey
ALTER TABLE "Church" ADD CONSTRAINT "Church_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "EnderecoIgreja"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Church" ADD CONSTRAINT "Church_pastorPrincipalId_fkey" FOREIGN KEY ("pastorPrincipalId") REFERENCES "Pastor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Congregacao" ADD CONSTRAINT "Congregacao_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "Church"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Congregacao" ADD CONSTRAINT "Congregacao_pastorDirigenteId_fkey" FOREIGN KEY ("pastorDirigenteId") REFERENCES "Pastor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ministerio" ADD CONSTRAINT "Ministerio_congregacaoId_fkey" FOREIGN KEY ("congregacaoId") REFERENCES "Congregacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ministerio" ADD CONSTRAINT "Ministerio_liderId_fkey" FOREIGN KEY ("liderId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MinisterioLocal" ADD CONSTRAINT "MinisterioLocal_congregacaoId_fkey" FOREIGN KEY ("congregacaoId") REFERENCES "Congregacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EscolaLideresTurma" ADD CONSTRAINT "EscolaLideresTurma_congregacaoId_fkey" FOREIGN KEY ("congregacaoId") REFERENCES "Congregacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EscolaLideresModulo" ADD CONSTRAINT "EscolaLideresModulo_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "EscolaLideresTurma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EscolaLideresLicao" ADD CONSTRAINT "EscolaLideresLicao_etapaId_fkey" FOREIGN KEY ("etapaId") REFERENCES "EscolaLideresModulo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Encontro" ADD CONSTRAINT "Encontro_congregacaoId_fkey" FOREIGN KEY ("congregacaoId") REFERENCES "Congregacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_congregacaoId_fkey" FOREIGN KEY ("congregacaoId") REFERENCES "Congregacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_celulaId_fkey" FOREIGN KEY ("celulaId") REFERENCES "Celula"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_discipuladorId_fkey" FOREIGN KEY ("discipuladorId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnderecoMembro" ADD CONSTRAINT "EnderecoMembro_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_congregacaoId_fkey" FOREIGN KEY ("congregacaoId") REFERENCES "Congregacao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offering" ADD CONSTRAINT "Offering_congregacaoId_fkey" FOREIGN KEY ("congregacaoId") REFERENCES "Congregacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offering" ADD CONSTRAINT "Offering_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offering" ADD CONSTRAINT "Offering_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Despesa" ADD CONSTRAINT "Despesa_congregacaoId_fkey" FOREIGN KEY ("congregacaoId") REFERENCES "Congregacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receita" ADD CONSTRAINT "Receita_congregacaoId_fkey" FOREIGN KEY ("congregacaoId") REFERENCES "Congregacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investimento" ADD CONSTRAINT "Investimento_congregacaoId_fkey" FOREIGN KEY ("congregacaoId") REFERENCES "Congregacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Celula" ADD CONSTRAINT "Celula_congregacaoId_fkey" FOREIGN KEY ("congregacaoId") REFERENCES "Congregacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Celula" ADD CONSTRAINT "Celula_liderId_fkey" FOREIGN KEY ("liderId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Celula" ADD CONSTRAINT "Celula_anfitriaoId_fkey" FOREIGN KEY ("anfitriaoId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReuniaoCelula" ADD CONSTRAINT "ReuniaoCelula_celulaId_fkey" FOREIGN KEY ("celulaId") REFERENCES "Celula"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PresencaCelula" ADD CONSTRAINT "PresencaCelula_membroId_fkey" FOREIGN KEY ("membroId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PresencaCelula" ADD CONSTRAINT "PresencaCelula_reuniaoId_fkey" FOREIGN KEY ("reuniaoId") REFERENCES "ReuniaoCelula"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisitanteCelula" ADD CONSTRAINT "VisitanteCelula_reuniaoId_fkey" FOREIGN KEY ("reuniaoId") REFERENCES "ReuniaoCelula"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioPermissao" ADD CONSTRAINT "UsuarioPermissao_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioPermissao" ADD CONSTRAINT "UsuarioPermissao_permissaoId_fkey" FOREIGN KEY ("permissaoId") REFERENCES "Permissao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notificacao" ADD CONSTRAINT "Notificacao_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TokenRecuperacaoSenha" ADD CONSTRAINT "TokenRecuperacaoSenha_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Arquivo" ADD CONSTRAINT "Arquivo_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venda" ADD CONSTRAINT "Venda_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "Church"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venda" ADD CONSTRAINT "Venda_upgradeDeId_fkey" FOREIGN KEY ("upgradeDeId") REFERENCES "Venda"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fatura" ADD CONSTRAINT "Fatura_vendaId_fkey" FOREIGN KEY ("vendaId") REFERENCES "Venda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogAcesso" ADD CONSTRAINT "LogAcesso_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Encontros" ADD CONSTRAINT "Encontros_discipuladorId_fkey" FOREIGN KEY ("discipuladorId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Encontros" ADD CONSTRAINT "Encontros_discipulandoId_fkey" FOREIGN KEY ("discipulandoId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LiveStream" ADD CONSTRAINT "LiveStream_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "Church"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TurmaAlunos" ADD CONSTRAINT "_TurmaAlunos_A_fkey" FOREIGN KEY ("A") REFERENCES "EscolaLideresTurma"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TurmaAlunos" ADD CONSTRAINT "_TurmaAlunos_B_fkey" FOREIGN KEY ("B") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EncontroParticipantes" ADD CONSTRAINT "_EncontroParticipantes_A_fkey" FOREIGN KEY ("A") REFERENCES "Encontro"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EncontroParticipantes" ADD CONSTRAINT "_EncontroParticipantes_B_fkey" FOREIGN KEY ("B") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MinisterioMembros" ADD CONSTRAINT "_MinisterioMembros_A_fkey" FOREIGN KEY ("A") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MinisterioMembros" ADD CONSTRAINT "_MinisterioMembros_B_fkey" FOREIGN KEY ("B") REFERENCES "Ministerio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MinisterioLocalMembros" ADD CONSTRAINT "_MinisterioLocalMembros_A_fkey" FOREIGN KEY ("A") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MinisterioLocalMembros" ADD CONSTRAINT "_MinisterioLocalMembros_B_fkey" FOREIGN KEY ("B") REFERENCES "MinisterioLocal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
