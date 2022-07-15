import axios, { AxiosRequestConfig } from "axios";
import { MantineTheme } from "@mantine/core";

import { aggregatedQuery, Query, sortBy, $match } from "../../types";

export function fetchJobs(url: string) {
  return async function (params: AxiosRequestConfig) {
    return (await axios.get(url, { ...params })).data;
  };
}

export const colorMixer = (
  theme: MantineTheme,
  light = "blue",
  dark = "yellow"
) => {
  let mode = theme.colorScheme === "dark" ? dark : light;

  return {
    light: theme.fn.darken(theme.colors[mode][1], 0.01),
    dark: theme.colors[mode][4],
    darker: theme.fn.darken(theme.colors[mode][4], 0.09),
  };
};

export const GroupByKey = (list: any[], ...args: string[]) => {
  return list.reduce((acc, curr) => {
    let keys: { [key: string]: any[] } = { ...acc };
    args.forEach((item) => {
      if (!keys[item]) keys[item] = [];
      if (!keys[item].includes(curr[item])) {
        let arr = keys[item];
        keys[item] = arr.concat([curr[item]]);
      }
    });
    return keys;
  }, {});
};

export const formatSalary = (salary: string) => {
  let [min, max] = salary
    .split("GBP per year")[0]
    .split(" - ")
    .map((val) => parseInt(val));
  return `£${min}k - £${max}k`;
};

export const queryAggregator = (query: Partial<Query>): aggregatedQuery => {
  let { page = "1", search_term, category, is_remote } = query;
  let categories: any = {};
  let match: $match = {};
  const limit = 12;

  category && (category as string).split(",").forEach((val: string) => {
    let [key, value] = val.split(":");
    (categories[key] = value)
  });

  let offset = +page * limit - limit;
  let { salary, jobtype, description } = categories;

  search_term && (match["title"] = search_term);
  is_remote && (match["location"] = "Remote");
  jobtype && (match["jobtype"] = jobtype);
  salary && (match["salary"] = salary);
  description && (match["description"] = description);

  return { limit, offset, match };
};
