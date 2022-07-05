import { AxiosRequestConfig, AxiosResponse } from "axios";
import { GetServerSideProps, NextPage } from "next";
import { JobsComponent } from "src/components/Jobs";
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

const Jobs: NextPage<{ jobs: any }> = (props) => {
  return <JobsComponent jobs={props.jobs} />;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  return { props: { jobs: await jobSources["arbeit"]({}) } };
};

export default Jobs;
