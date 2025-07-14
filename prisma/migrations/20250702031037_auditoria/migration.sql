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
