import { NextApiRequest, NextApiResponse } from "next";

import redis from "lib/redis";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  let redis_key = process.env.UPSTASH_REDIS_KEY ?? "";
  return res.status(200).json({ logs: await redis.lrange(redis_key, 0, -1) });
}
