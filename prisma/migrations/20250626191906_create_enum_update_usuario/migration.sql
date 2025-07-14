/*
  Warnings:

  - Changed the type of `perfil` on the `Usuario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PerfilUsuario" AS ENUM ('admin', 'dirigente', 'tesoureiro');

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "perfil",
ADD COLUMN     "perfil" "PerfilUsuario" NOT NULL;
