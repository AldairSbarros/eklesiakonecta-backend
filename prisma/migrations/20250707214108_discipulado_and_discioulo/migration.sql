-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "discipuladorId" INTEGER;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_discipuladorId_fkey" FOREIGN KEY ("discipuladorId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;
