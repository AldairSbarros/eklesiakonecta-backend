/*
  Warnings:

  - A unique constraint covering the columns `[clienteId]` on the table `ConfigEmail` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ConfigEmail_clienteId_key" ON "ConfigEmail"("clienteId");
