/*
  Warnings:

  - You are about to drop the `EscolaLideresEtapa` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EscolaLideresEtapa" DROP CONSTRAINT "EscolaLideresEtapa_turmaId_fkey";

-- DropForeignKey
ALTER TABLE "EscolaLideresLicao" DROP CONSTRAINT "EscolaLideresLicao_etapaId_fkey";

-- DropTable
DROP TABLE "EscolaLideresEtapa";

-- CreateTable
CREATE TABLE "EscolaLideresModulo" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "turmaId" INTEGER NOT NULL,

    CONSTRAINT "EscolaLideresModulo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EscolaLideresModulo" ADD CONSTRAINT "EscolaLideresModulo_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "EscolaLideresTurma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EscolaLideresLicao" ADD CONSTRAINT "EscolaLideresLicao_etapaId_fkey" FOREIGN KEY ("etapaId") REFERENCES "EscolaLideresModulo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
