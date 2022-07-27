import { queryAggregator, setCookie } from "src/util";
import { GetServerSideProps, NextPage } from "next";
import { JobsComponent } from "src/components/Jobs";
import { getJobs } from "lib/getJobs";

import { JobsPage } from "../../../types";
import { locationMap } from "..";

const Jobs: NextPage<JobsPage> = (props) => <JobsComponent {...props} />;

type ServerSideProps = GetServerSideProps<JobsPage>;

export const getServerSideProps: ServerSideProps = async ({
  res,
  req,
  query,
}) => {
  let { location = "" } = query;
  
  location = location as string;

  let hasKey = Object.keys(locationMap).includes(location);
  if (!hasKey) {
    return {
      redirect: {
        permanent: false,
        destination: "/jobs",
      },
    };
  }

  !(req.cookies["location"] === location) &&
    res.setHeader("set-cookie", setCookie("location", location, 7));
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  let { jobs, pagination } = await getJobs(
    queryAggregator({ ...query, country: locationMap[location] })
  );

  return {
    props: {
      jobs: jobs.map(({ _id, ...rest }: any) => ({ ...rest })),
      pagination,
      location,
    },
  };
};

export default Jobs;
