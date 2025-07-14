/*
  Warnings:

  - Added the required column `updatedAt` to the `Celula` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Celula" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "diaSemana" TEXT,
ADD COLUMN     "horario" TEXT,
ADD COLUMN     "local" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "CelulaMembro" (
    "id" SERIAL NOT NULL,
    "celulaId" INTEGER NOT NULL,
    "membroId" INTEGER NOT NULL,

    CONSTRAINT "CelulaMembro_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CelulaMembro" ADD CONSTRAINT "CelulaMembro_celulaId_fkey" FOREIGN KEY ("celulaId") REFERENCES "Celula"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CelulaMembro" ADD CONSTRAINT "CelulaMembro_membroId_fkey" FOREIGN KEY ("membroId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
