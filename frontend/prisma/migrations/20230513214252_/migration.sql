-- CreateTable
CREATE TABLE "Contest" (
    "contestAddress" TEXT NOT NULL PRIMARY KEY,
    "overview" TEXT NOT NULL,
    "scope" TEXT NOT NULL,
    "outOfScope" TEXT NOT NULL,
    "links" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startAt" DATETIME NOT NULL,
    "closeAt" DATETIME NOT NULL,
    "prize" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FilteredVulnerability" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "subVulnId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "proofOfConcept" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    CONSTRAINT "FilteredVulnerability_subVulnId_fkey" FOREIGN KEY ("subVulnId") REFERENCES "SubmittedVulnerability" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "SubmittedVulnerability" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "contestAddress" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "proofOfConcept" TEXT NOT NULL,
    "ownerAddress" TEXT NOT NULL,
    CONSTRAINT "SubmittedVulnerability_contestAddress_fkey" FOREIGN KEY ("contestAddress") REFERENCES "Contest" ("contestAddress") ON DELETE NO ACTION ON UPDATE NO ACTION
);
