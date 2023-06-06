import { getAllContests, insertContest } from "@/database/entities";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  if (_req.method === "POST") {
    try {
      const contest = _req.body;
      const insertedContest = await insertContest(contest);
      res.status(200).json({ statusCode: 200, data: insertedContest });
    } catch (error: any) {
      res.status(500).json({ statusCode: 500, message: error.message });
    }
  } else if (_req.method === "GET") {
    try {
      const allContests = await getAllContests();
      res.status(200).json({ statusCode: 200, data: allContests });
    } catch (error: any) {
      res.status(500).json({ statusCode: 500, message: error.message });
    }
  } else {
    res.status(401).json({ statusCode: 401, message: "Unauthorized" });
  }
};

export default handler;
