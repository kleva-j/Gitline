import { AxiosResponse, AxiosRequestConfig } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { fetchArbeitJobs } from "src/util/scraper";
import { fetchJobs } from "src/util";

type jobsType = AxiosResponse<any, any> | any[];

let jobSources: {
  [key: string]: (params: AxiosRequestConfig) => Promise<jobsType>;
} = {
  arbeit: fetchArbeitJobs,
  swiss: fetchJobs(process.env.NEXT_PUBLIC_SWISS_JOBS || ""),
  devitjobs: fetchJobs(process.env.NEXT_PUBLIC_DEVITJOBS || ""),
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ jobs: jobsType }>
) {
  const { source = "arbeit" } = req.query;
  let jobs = await jobSources[source as string]({});
  res.status(200).json({ jobs });
}
