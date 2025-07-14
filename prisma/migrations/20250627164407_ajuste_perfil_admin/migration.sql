/*
  Warnings:

  - The values [admin] on the enum `PerfilUsuario` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PerfilUsuario_new" AS ENUM ('ADMIN', 'dirigente', 'tesoureiro');
ALTER TABLE "Usuario" ALTER COLUMN "perfil" TYPE "PerfilUsuario_new" USING ("perfil"::text::"PerfilUsuario_new");
ALTER TYPE "PerfilUsuario" RENAME TO "PerfilUsuario_old";
ALTER TYPE "PerfilUsuario_new" RENAME TO "PerfilUsuario";
DROP TYPE "PerfilUsuario_old";
COMMIT;
