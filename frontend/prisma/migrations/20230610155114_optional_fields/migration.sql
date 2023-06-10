-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SubmittedVulnerability" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "contestAddress" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "proofOfConcept" TEXT NOT NULL,
    "ownerAddress" TEXT NOT NULL,
    "filteredVulnerabilityId" INTEGER,
    CONSTRAINT "SubmittedVulnerability_filteredVulnerabilityId_fkey" FOREIGN KEY ("filteredVulnerabilityId") REFERENCES "FilteredVulnerability" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "SubmittedVulnerability_contestAddress_fkey" FOREIGN KEY ("contestAddress") REFERENCES "Contest" ("contestAddress") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_SubmittedVulnerability" ("contestAddress", "filteredVulnerabilityId", "id", "name", "ownerAddress", "proofOfConcept") SELECT "contestAddress", "filteredVulnerabilityId", "id", "name", "ownerAddress", "proofOfConcept" FROM "SubmittedVulnerability";
DROP TABLE "SubmittedVulnerability";
ALTER TABLE "new_SubmittedVulnerability" RENAME TO "SubmittedVulnerability";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
