import { insertFilteredVulnerability, updateSubmittedVulnerability } from "@/database/entities";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  if (_req.method === "POST") {
    try {
      const filteredVulnerabilities = JSON.parse(_req.body) as WithoutId<FilteredVulnerabilityWithSubmitted>[];

      // Use Promise.all to insert all vulnerabilities concurrently
      const filteredVulnerabilitiesResponse = await Promise.all(
        filteredVulnerabilities.map((vuln) => {
          const { associatedVulnerabilities, ...filteredVuln } = vuln;
          return insertFilteredVulnerability(filteredVuln);
        })
      );

      for (let i = 0; i < filteredVulnerabilitiesResponse.length; i++) {
        const insertedVuln = filteredVulnerabilitiesResponse[i];
        const { associatedVulnerabilities } = filteredVulnerabilities[i];

        for (let j = 0; j < associatedVulnerabilities.length; j++) {
          const associatedVuln = associatedVulnerabilities[j];
          associatedVuln.filteredVulnerabilityId = insertedVuln.id;
          await updateSubmittedVulnerability(associatedVuln);
        }
      }

      res.status(200).json({ statusCode: 200 });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ statusCode: 500, message: error.message });
    }
  } else {
    res.status(401).json({ statusCode: 401, message: "Unauthorized" });
  }
};

export default handler;
