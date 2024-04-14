-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_check_in" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at " DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attendee_id " INTEGER NOT NULL,
    CONSTRAINT "check_in_attendee_id _fkey" FOREIGN KEY ("attendee_id ") REFERENCES "ateendes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_check_in" ("attendee_id ", "created_at ", "id") SELECT "attendee_id ", "created_at ", "id" FROM "check_in";
DROP TABLE "check_in";
ALTER TABLE "new_check_in" RENAME TO "check_in";
CREATE UNIQUE INDEX "check_in_attendee_id _key" ON "check_in"("attendee_id ");
CREATE TABLE "new_ateendes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at " DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eventId" TEXT NOT NULL,
    CONSTRAINT "ateendes_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ateendes" ("created_at ", "email", "eventId", "id", "name") SELECT "created_at ", "email", "eventId", "id", "name" FROM "ateendes";
DROP TABLE "ateendes";
ALTER TABLE "new_ateendes" RENAME TO "ateendes";
CREATE UNIQUE INDEX "ateendes_eventId_email_key" ON "ateendes"("eventId", "email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
