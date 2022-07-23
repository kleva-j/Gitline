import clientPromise from "./mongodb";

export default async function postJobs({ job }: any): Promise<any> {
  const client = await clientPromise;
  try {
    const collection = await client.db("gitline-sample").collection("jobs");
    await collection.deleteMany();
    await collection.insertMany(job, {});
  } catch (err) {
    throw err;
  }
}
