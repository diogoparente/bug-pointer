/*
  Warnings:

  - Added the required column `sponsor` to the `Contest` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Contest" (
    "contestAddress" TEXT NOT NULL PRIMARY KEY,
    "sponsor" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "scope" TEXT NOT NULL,
    "outOfScope" TEXT NOT NULL,
    "links" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startAt" DATETIME NOT NULL,
    "closeAt" DATETIME NOT NULL,
    "prize" TEXT NOT NULL
);
INSERT INTO "new_Contest" ("closeAt", "contestAddress", "links", "name", "outOfScope", "overview", "prize", "scope", "startAt") SELECT "closeAt", "contestAddress", "links", "name", "outOfScope", "overview", "prize", "scope", "startAt" FROM "Contest";
DROP TABLE "Contest";
ALTER TABLE "new_Contest" RENAME TO "Contest";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
