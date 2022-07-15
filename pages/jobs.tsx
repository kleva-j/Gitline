import { GetServerSideProps, NextPage } from "next";
import { JobsComponent } from "src/components/Jobs";

import getJobs from "lib/getJobs";

import { JobsPage } from "../types";
import { queryAggregator } from "src/util";

const Jobs: NextPage<JobsPage> = (props) => <JobsComponent {...props} />;

type ServerSideProps = GetServerSideProps<JobsPage>;

export const getServerSideProps: ServerSideProps = async ({ res, query }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  let { jobs, pagination } = await getJobs(queryAggregator(query));

  return {
    props: {
      jobs: jobs.map(({ _id, ...rest }: any) => ({ ...rest })),
      pagination,
    },
  };
};

export default Jobs;
