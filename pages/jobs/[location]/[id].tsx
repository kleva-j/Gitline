import { getJobs, getSingleJob } from "lib/getJobs";
import { Job } from "src/components/Jobs/Job";
import { NextPage } from "next";

import { JobCardProps } from "../../../types";

const SingleJob: NextPage<{ job: JobCardProps }> = (props) => <Job {...props.job} />;

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

export async function getStaticPaths() {
  let { jobs } = await getJobs({ $limit: 400 });
  return {
    paths: jobs.map(({ id }: any) => ({ params: { id } })),
    fallback: process.env.NODE_ENV === "development",
  };
}

export default SingleJob;
