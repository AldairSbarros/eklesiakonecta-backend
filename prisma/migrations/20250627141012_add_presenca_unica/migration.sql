/*
  Warnings:

  - A unique constraint covering the columns `[reuniaoId,membroId]` on the table `PresencaCelula` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PresencaCelula_reuniaoId_membroId_key" ON "PresencaCelula"("reuniaoId", "membroId");
