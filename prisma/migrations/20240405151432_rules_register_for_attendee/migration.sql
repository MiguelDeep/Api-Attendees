/*
  Warnings:

  - A unique constraint covering the columns `[eventId,email]` on the table `ateendes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ateendes_eventId_email_key" ON "ateendes"("eventId", "email");
