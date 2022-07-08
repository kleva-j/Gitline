import { fetchArbeitJobs } from "src/util/scraper";
import { AxiosRequestConfig } from "axios";
import { fetchJobs } from "src/util";

import clientPromise from "./mongodb";

type jobsType = { [key: string]: any };

let jobSources: {
  [key: string]: (params: AxiosRequestConfig) => Promise<jobsType>;
} = {
  arbeit: fetchArbeitJobs,
  swiss: fetchJobs(process.env.NEXT_PUBLIC_SWISS_JOBS || ""),
  devitjobs: fetchJobs(process.env.NEXT_PUBLIC_DEVITJOBS || ""),
};

export default async function postJobs(): Promise<any> {
  const client = await clientPromise;
  try {
    let { jobs } = await jobSources["devitjobs"]({});
    const collection = await client.db("gitline-sample").collection("jobs");
    await collection.deleteMany();
    await collection.insertMany(jobs["job"], {});
  } catch (err) {
    throw err;
  }
}
