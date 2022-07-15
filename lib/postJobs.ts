import { fetchJobs } from "src/util";

import clientPromise from "./mongodb";

export default async function postJobs(): Promise<any> {
  const client = await clientPromise;
  try {
    let { jobs } = await fetchJobs(process.env.NEXT_PUBLIC_DEVITJOBS ?? "")({});
    const collection = await client.db("gitline-sample").collection("jobs");
    await collection.deleteMany();
    await collection.insertMany(jobs.job, {});
  } catch (err) {
    throw err;
  }
}
