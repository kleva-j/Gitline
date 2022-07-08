import { NextApiRequest, NextApiResponse } from "next";

import postJobs from "lib/postJobs";
import getJobs from "lib/getJobs";

type Response = {
  success: boolean;
  statusCode: number;
  message: string;
  jobs: any[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Partial<Response>>
) {
  try {
    if (req.method === "POST") {
      await postJobs();
      res.status(200).json({ message: "Successfully posted jobs." });
    } else if (req.method === "GET") {
      let jobs = await getJobs({});
      res.status(200).json({ message: "Successfully retrieved jobs.", jobs });
    } else {
      res.setHeader("Allow", "GET");
      res.setHeader("Allow", "POST");
      res.status(405).end("Method Not Allowed");
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  }
}
