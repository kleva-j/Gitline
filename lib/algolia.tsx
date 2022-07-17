import algoliasearch from "algoliasearch";

import { fetchJobs } from "src/util";

export default async function AlgoliaIndexing() {
  const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID ?? "";
  const ALGOLIA_INDEX_NAME = process.env.ALGOLIA_INDEX_NAME ?? "";
  const ALGOLIA_ADMIN_API_KEY = process.env.ALGOLIA_ADMIN_API_KEY ?? "";

  const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_API_KEY);
  const index = client.initIndex(ALGOLIA_INDEX_NAME);

  let { jobs } = await fetchJobs(process.env.NEXT_PUBLIC_DEVITJOBS ?? "")({});
  await index
    .replaceAllObjects(jobs.job, {
      autoGenerateObjectIDIfNotExist: true,
      safe: true,
    })
    .wait();
}
