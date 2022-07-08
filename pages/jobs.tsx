import { GetServerSideProps, NextPage } from "next";
import { JobsComponent } from "src/components/Jobs";
import { GroupByKey } from "src/util";

import getJobs from "lib/getJobs";

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
  let jobs: any[] = await getJobs({ });
  jobs = jobs.map(({ _id, ...rest }) => ({...rest}));

  return {
    props: { jobs, ...GroupByKey(jobs, "location", "country") },
  };
};

export default Jobs;
