import { queryAggregator, concatQuery, fetchAllJobs } from "src/util";
import { NextApiRequest, NextApiResponse } from "next";
import { Response } from "../../types";
import { getJobs } from "lib/getJobs";

import AlgoliaIndexing from "lib/algolia";
import postJobs from "lib/postJobs";
import redis from "lib/redis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Partial<Response>>
) {
  if (!["POST", "GET"].includes(req.method ?? "")) {
    res.setHeader("Allow", "GET");
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }

  try {
    if (req.method === "POST") {
      // let { jobs } = await fetchJobs(UK_JOBS_URL)({});
      // postJobs(jobs);
      // AlgoliaIndexing(jsonJobs);
      // let result: any = await fetchAllJobs();
      res.status(200).json({ message: "Successful" });
    }
    if (req.method === "GET") {
      let key = concatQuery(req.query);
      let result: any = await redis.get(key);
      if (!result) {
        result = await getJobs(queryAggregator(req.query));
      }
      redis.setex(key, 600, JSON.stringify(result));
      res
        .status(200)
        .json({
          message: "Successful.",
          result: typeof result === "string" ? JSON.parse(result) : result,
        });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  }
}
