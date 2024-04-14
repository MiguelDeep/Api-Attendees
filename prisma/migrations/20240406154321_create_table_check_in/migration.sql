-- CreateTable
CREATE TABLE "check_in" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at " DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attendee_id " INTEGER NOT NULL,
    CONSTRAINT "check_in_attendee_id _fkey" FOREIGN KEY ("attendee_id ") REFERENCES "ateendes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "check_in_attendee_id _key" ON "check_in"("attendee_id ");
