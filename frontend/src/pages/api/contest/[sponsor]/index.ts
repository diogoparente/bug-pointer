import { getContestBySponsor, insertContest } from '@/database/entities'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
    const sponsor = _req.query.sponsor;
    const contestsBySponsor = await getContestBySponsor(sponsor as string);
    res.status(200).json({ statusCode: 200, data: contestsBySponsor });
}

export default handler