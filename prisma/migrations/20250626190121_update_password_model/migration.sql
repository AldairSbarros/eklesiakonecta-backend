/*
  Warnings:

  - You are about to drop the column `criadoEm` on the `TokenRecuperacaoSenha` table. All the data in the column will be lost.
  - You are about to drop the column `expirado` on the `TokenRecuperacaoSenha` table. All the data in the column will be lost.
  - Added the required column `expiresAt` to the `TokenRecuperacaoSenha` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TokenRecuperacaoSenha" DROP COLUMN "criadoEm",
DROP COLUMN "expirado",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "used" BOOLEAN NOT NULL DEFAULT false;
