import { NextApiRequest, NextApiResponse } from "next";
import { locations } from "pages/jobs/[location]/[id]";
import { getAllJobs, getJobs } from "lib/getJobs";
import { queryAggregator } from "src/util";
import { locationMap } from "pages/jobs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  let allowedMethods = ["GET"];
  if (!allowedMethods.includes(req.method ?? "")) {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method Not Allowed");
  }

  try {
    if (req.method === "GET") {
      let { paginated, country } = req.query;
      country = country as string;
      country =
        country && locations.includes(country)
          ? locationMap[country]
          : undefined;

      let query = {
        ...req.query,
        ...(country ? { country } : {}),
      };

      let result =
        paginated && paginated === "false"
          ? await getAllJobs()
          : await getJobs(queryAggregator(query));
      return res.status(200).json({ message: "Successful", result });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  }
}
