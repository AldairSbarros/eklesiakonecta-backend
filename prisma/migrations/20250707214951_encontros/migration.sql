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

-- AddForeignKey
ALTER TABLE "Encontros" ADD CONSTRAINT "Encontros_discipuladorId_fkey" FOREIGN KEY ("discipuladorId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Encontros" ADD CONSTRAINT "Encontros_discipulandoId_fkey" FOREIGN KEY ("discipulandoId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
