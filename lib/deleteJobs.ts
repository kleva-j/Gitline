import clientPromise from "./mongodb";

export default async function deleteJobs(): Promise<any> {
  const client = await clientPromise;
  try {
    const collection = await client.db("gitline-sample").collection("jobs");
    await collection.deleteMany();
  } catch (err) {
    throw err;
  } finally {
    await client.close();
  }
}
