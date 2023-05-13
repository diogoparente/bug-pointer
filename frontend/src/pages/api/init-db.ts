// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {db, initDB} from "@/db"

type Data = {
  success: boolean;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    initDB();
  } catch (error) {
    console.log(error);
    
    res.status(422).json({ success: false });
    return;
  }

  res.status(200).json({ success: true });
}
