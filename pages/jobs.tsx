import { GetServerSideProps, NextPage } from "next";
import { JobsComponent } from "src/components/Jobs";
import { fetchJobs, GroupByKey } from "src/util";
import { AxiosRequestConfig } from "axios";

type jobsType = { [key: string]: any };

let jobSources: {
  [key: string]: (params: AxiosRequestConfig) => Promise<jobsType>;
} = {
  swiss: fetchJobs(process.env.NEXT_PUBLIC_SWISS_JOBS || ""),
  devitjobs: fetchJobs(process.env.NEXT_PUBLIC_DEVITJOBS || ""),
};

interface JobsPage {
  jobs: any[];
  locations: string[];
  country: string[];
}

const Jobs: NextPage<JobsPage> = ({ jobs }) => <JobsComponent jobs={jobs} />;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  let { jobs } = await jobSources["devitjobs"]({});
  let jobSlice = jobs["job"].slice(0, 10);
  return {
    props: {
      jobs: jobSlice,
      ...GroupByKey(jobSlice, "location", "country"),
    },
  };
};

export default Jobs;
