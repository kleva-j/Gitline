import { NextRequest, NextResponse, userAgent } from "next/server";
import redis from "lib/redis";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const response = NextResponse.next();
  
  if (url.pathname.startsWith("/api/jobs")) {
    let { geo, ip, url } = req;
    const ua = userAgent(req);
    const time = new Date(Date.now()).toLocaleDateString();
    let redis_key = process.env.UPSTASH_REDIS_KEY ?? "";
    redis.lpush(redis_key, { url, time, ip, ua, geo });
  }
  return response;
}
