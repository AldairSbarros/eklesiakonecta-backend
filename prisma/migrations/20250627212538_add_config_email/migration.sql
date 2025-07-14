/*
  Warnings:

  - The values [dirigente,tesoureiro] on the enum `PerfilUsuario` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PerfilUsuario_new" AS ENUM ('ADMIN', 'Dirigente', 'Tesoureiro');
ALTER TABLE "Usuario" ALTER COLUMN "perfil" TYPE "PerfilUsuario_new" USING ("perfil"::text::"PerfilUsuario_new");
ALTER TYPE "PerfilUsuario" RENAME TO "PerfilUsuario_old";
ALTER TYPE "PerfilUsuario_new" RENAME TO "PerfilUsuario";
DROP TYPE "PerfilUsuario_old";
COMMIT;

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
