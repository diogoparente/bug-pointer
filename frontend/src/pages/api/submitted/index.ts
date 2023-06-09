import { insertSubmittedVulnerability } from "@/database/entities";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  if (_req.method === "POST") {
    try {
      const vuln = _req.body;
      const insertedVuln = await insertSubmittedVulnerability(JSON.parse(vuln));
      res.status(200).json({ statusCode: 200, data: insertedVuln });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ statusCode: 500, message: error.message });
    }
  } else {
    res.status(401).json({ statusCode: 401, message: "Unauthorized" });
  }
};

export default handler;
