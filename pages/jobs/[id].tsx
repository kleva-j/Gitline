import { getSingleJob } from 'lib/getJobs';
import React from 'react'

const SingleJob = () => {
  return (
    <div></div>
  )
}

export async function getStaticPaths({ params }: any) {
  const { id } = params;
  return {
    props: {
      job: await getSingleJob({ id })
    }
  }
}

export default SingleJob;