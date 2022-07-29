import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { getJobs, getAllJobs, getSingleJob } from "lib/getJobs";
import { Job } from "src/components/Jobs/Job";

import { JobCardProps } from "../../../types";
import { locationMap } from "..";

const SingleJob: NextPage<{ job: JobCardProps }> = (props) => (
  <Job {...props.job} />
);

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  try {
    const { job } = await getSingleJob({ id: params.id });
    if (!job) return { notFound: true };
    const { _id, ...rest } = job;
    return { props: { job: { ...rest } } };
  } catch (error) {
    return { notFound: true };
  }
};

export let locations = Object.keys(locationMap);
export let locValues = Object.values(locationMap);

export const getStaticPaths: GetStaticPaths = async () => {
  let allJobs = (await getAllJobs()).jobs.map(({ id, country }: any) => ({
    params: { id, location: locations[locValues.indexOf(country)] },
  }));

  return {
    paths: allJobs,
    fallback: process.env.NODE_ENV === "development",
  };
};

export default SingleJob;
