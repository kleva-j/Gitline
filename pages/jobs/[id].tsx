import { getJobs, getSingleJob } from "lib/getJobs";
import { NextPage } from 'next';

const SingleJob: NextPage = (props: any) => {
  console.log(props);
  return <div>This is a single job page.</div>;
};

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
  let { jobs } = await getJobs({ limit: 100 });
  return {
    paths: jobs.map(({ id }: any) => ({ params: { id } })),
    fallback: process.env.NODE_ENV === "development",
  };
}

export default SingleJob;
