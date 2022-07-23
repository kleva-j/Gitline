import clientPromise from "./mongodb";
import { Params } from "../types";

export const getJobs = async (params: Params): Promise<any> => {
  let { $skip = 0, $limit = 12 } = params;
  const client = await clientPromise;
  try {
    const collection = client.db("gitline-sample").collection("jobs");
    const total = await collection.count();
    let page = ($skip + $limit) / $limit;
    let lastPage = Math.ceil(total / $limit);
    return {
      jobs: await collection.aggregate([{ $skip }, { $limit }]).toArray(),
      pagination: { page, lastPage, isLastPage: page === lastPage, total },
    };
  } catch (err) {
    throw err;
  }
};

export const getSingleJob = async ({ id }: { id: string }): Promise<any> => {
  try {
    const client = await clientPromise;
    const job = await client.db("gitline-sample").collection("jobs").findOne({ id });
    if (job) return { job };
    return null;
  } catch (err) {
    throw err;
  }
};
