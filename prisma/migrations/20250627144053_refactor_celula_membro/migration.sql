/*
  Warnings:

  - You are about to drop the `CelulaMembro` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CelulaMembro" DROP CONSTRAINT "CelulaMembro_celulaId_fkey";

-- DropForeignKey
ALTER TABLE "CelulaMembro" DROP CONSTRAINT "CelulaMembro_membroId_fkey";

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "celulaId" INTEGER,
ADD COLUMN     "dataNascimento" TIMESTAMP(3);

-- DropTable
DROP TABLE "CelulaMembro";

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_celulaId_fkey" FOREIGN KEY ("celulaId") REFERENCES "Celula"("id") ON DELETE SET NULL ON UPDATE CASCADE;
