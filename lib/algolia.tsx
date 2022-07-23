import algoliasearch from "algoliasearch";

const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID ?? "";
const ALGOLIA_INDEX_NAME = process.env.ALGOLIA_INDEX_NAME ?? "";
const ALGOLIA_ADMIN_API_KEY = process.env.ALGOLIA_ADMIN_API_KEY ?? "";

export default async function AlgoliaIndexing({ job }: any) {
  try {
    const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_API_KEY);
    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    let result = await Promise.allSettled([
      index.replaceAllObjects(job, {
        autoGenerateObjectIDIfNotExist: true,
        safe: true,
      }),
      index.setSettings({
        searchableAttributes: ["unordered(title)"],
      }),
    ]);
    result.forEach((operation) => {
      if (operation.status === "rejected") {
        throw new Error(operation.reason);
      }
    });
  } catch (err) {
    throw err;
  }
}
