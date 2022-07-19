import clientPromise from "./mongodb";
import { Params } from "../types";

export default async function getJobs({
  offset = 0,
  limit = 12,
}: Params): Promise<any> {
  const client = await clientPromise;
  try {
    const collection = client.db("gitline-sample").collection("jobs");
    const results = await collection.aggregate([
      { $limit: limit },
      { $skip: offset },
    ]);
    const total = await collection.count();
    let page = (offset + limit) / limit;
    let lastPage = Math.ceil(total / limit);
    return {
      jobs: await results.toArray(),
      pagination: { page, lastPage, isLastPage: page === lastPage, total },
    };
  } catch (err) {
    throw err;
  }
}

export const getSingleJob = async ({ id }: { id: string }) => {
  const client = await clientPromise;
  try {
    return {
      job: await client.db("gitline-sample").collection("jobs").find({ id }),
    };
  } catch (err) {
    throw err;
  }
};
