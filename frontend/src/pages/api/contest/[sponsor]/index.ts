import { getContestsBySponsor } from "@/database/entities";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const sponsor = _req.query.sponsor;
    if (typeof sponsor !== "string") {
      res.status(400).json({ statusCode: 400, message: "Bad Request" });
    }
    const contestsBySponsor = await getContestsBySponsor(sponsor as string);
    res.status(200).json({ statusCode: 200, data: contestsBySponsor });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ statusCode: 500, message: error.message });
  }
};

export default handler;
