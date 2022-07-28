import { getJobs, getSingleJob } from "lib/getJobs";
import { Job } from "src/components/Jobs/Job";
import { NextPage } from "next";

import { JobCardProps } from "../../../types";
import { locationMap } from "..";

const SingleJob: NextPage<{ job: JobCardProps }> = (props) => (
  <Job {...props.job} />
);

export async function getStaticProps({ params }: any) {
  try {
    const { job } = await getSingleJob({ id: params.id });
    if (!job) return { notFound: true };
    const { _id, ...rest } = job;
    return { props: { job: { ...rest } } };
  } catch (error) {
    return { notFound: true };
  }
}

let locations = Object.keys(locationMap);

export async function getStaticPaths() {
  let alljobs = (
    await Promise.all(
      locations.map(
        async (item) =>
          await getJobs({ $match: { country: locationMap[item] }, $limit: 400 })
      )
    )
  )
    .map(({ jobs }, index) =>
      jobs.map(({ id }: any) => ({
        params: { id, location: locations[index] },
      }))
    )
    .flat();

  return {
    paths: alljobs,
    fallback: process.env.NODE_ENV === "development",
  };
}

export default SingleJob;
