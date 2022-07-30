import clientPromise from "./mongodb";
import { Params } from "../types";

export const getJobs = async (params: Params): Promise<any> => {
  let { $skip = 0, $limit = 12, $match = {} } = params;
  const client = await clientPromise;
  try {
    const collection = client.db("gitline-sample").collection("jobs");
    let query = [{ $match }, { $skip }, { $limit }];
    let jobs = await collection.aggregate(query).toArray();
    let total = await collection.count();
    let page = ($skip + $limit) / $limit;
    let lastPage = Math.ceil(total / $limit);
    return {
      jobs,
      pagination: { page, lastPage, isLastPage: page === lastPage, total },
    };
  } catch (err) {
    throw err;
  }
};

export const getAllJobs = async (): Promise<{ jobs: any }> => {
  const client = await clientPromise;
  try {
    const collection = client.db("gitline-sample").collection("jobs");
    const jobs = await collection.find({}).toArray();
    return { jobs };
  } catch (err) {
    throw err;
  }
};

export const getSingleJob = async ({ id }: { id: string }): Promise<any> => {
  try {
    const client = await clientPromise;
    const job = await client.db("gitline-sample").collection("jobs").findOne({ id });
    return { job }
  } catch (err) {
    throw err;
  }
};
