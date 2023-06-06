import { getContestsBySponsor } from "@/database/entities";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const sponsor = _req.query.sponsor;
  const contestsBySponsor = await getContestsBySponsor(sponsor as string);
  res.status(200).json({ statusCode: 200, data: contestsBySponsor });
};

export default handler;
