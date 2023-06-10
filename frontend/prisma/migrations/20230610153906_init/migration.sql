/*
  Warnings:

  - You are about to drop the column `subVulnId` on the `FilteredVulnerability` table. All the data in the column will be lost.
  - Added the required column `filteredVulnerabilityId` to the `SubmittedVulnerability` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contestAddress` to the `FilteredVulnerability` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SubmittedVulnerability" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "contestAddress" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "proofOfConcept" TEXT NOT NULL,
    "ownerAddress" TEXT NOT NULL,
    "filteredVulnerabilityId" INTEGER NOT NULL,
    CONSTRAINT "SubmittedVulnerability_filteredVulnerabilityId_fkey" FOREIGN KEY ("filteredVulnerabilityId") REFERENCES "FilteredVulnerability" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SubmittedVulnerability_contestAddress_fkey" FOREIGN KEY ("contestAddress") REFERENCES "Contest" ("contestAddress") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_SubmittedVulnerability" ("contestAddress", "id", "name", "ownerAddress", "proofOfConcept") SELECT "contestAddress", "id", "name", "ownerAddress", "proofOfConcept" FROM "SubmittedVulnerability";
DROP TABLE "SubmittedVulnerability";
ALTER TABLE "new_SubmittedVulnerability" RENAME TO "SubmittedVulnerability";
CREATE TABLE "new_FilteredVulnerability" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "proofOfConcept" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "contestAddress" TEXT NOT NULL,
    CONSTRAINT "FilteredVulnerability_contestAddress_fkey" FOREIGN KEY ("contestAddress") REFERENCES "Contest" ("contestAddress") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_FilteredVulnerability" ("id", "name", "proofOfConcept", "severity") SELECT "id", "name", "proofOfConcept", "severity" FROM "FilteredVulnerability";
DROP TABLE "FilteredVulnerability";
ALTER TABLE "new_FilteredVulnerability" RENAME TO "FilteredVulnerability";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
