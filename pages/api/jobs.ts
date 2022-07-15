import { NextApiRequest, NextApiResponse } from "next";
import postJobs from "lib/postJobs";
import getJobs from "lib/getJobs";

import { Response } from "../../types";
import AlgoliaIndexing from "lib/algolia";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Partial<Response>>
) {

  try {
    if (req.method === "POST") {
      postJobs();
      AlgoliaIndexing();
      res.status(200).json({ message: "Successful." });
    } else if (req.method === "GET") {
      let result = await getJobs({});
      res.status(200).json({ message: "Successful.", result });
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
