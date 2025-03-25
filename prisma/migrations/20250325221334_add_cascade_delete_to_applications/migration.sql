-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_eventId_fkey";

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
