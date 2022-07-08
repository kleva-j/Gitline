import clientPromise from "./mongodb";

interface params {
  offset?: number;
  limit?: number;
}

export default async function getJobs({
  offset = 0,
  limit = 12,
}: params): Promise<any> {
  const client = await clientPromise;
  try {
    const collection = client.db("gitline-sample").collection("jobs");
    const results = await collection
      .aggregate([{ $limit: limit }, { $skip: offset }])
      .toArray();
    return results;
  } catch (err) {
    throw err;
  }
}
