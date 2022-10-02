import axios, { AxiosRequestConfig } from "axios";
import { MantineTheme } from "@mantine/core";

import { aggregatedQuery, Query, timerFn, $match } from "../../types";

export function fetchJobs(url: string) {
  return async function (params: AxiosRequestConfig) {
    return (await axios.get(url, { ...params })).data;
  };
}

export function colorMixer(
  theme: MantineTheme,
  light = "blue",
  dark = "yellow"
) {
  let mode = theme.colorScheme === "dark" ? dark : light;

  return {
    light: theme.fn.darken(theme.colors[mode][1], 0.01),
    dark: theme.colors[mode][4],
    darker: theme.fn.darken(theme.colors[mode][4], 0.09),
  };
}

export function GroupByKey(list: any[], ...args: string[]) {
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
}

export function formatSalary(salary: string) {
  let [min, max] = salary
    .split("GBP per year")[0]
    .split(" - ")
    .map((val) => parseInt(val));
  return `£${min}k - £${max}k`;
}

export function queryAggregator(query: Partial<Query>): aggregatedQuery {
  let { page = "1", search_term, category, is_remote, country } = query;
  let categories: any = {};
  let match: $match = {};
  const $limit = 9;

  category &&
    (category as string).split(",").forEach((val: string) => {
      let [key, value] = val.split(":");
      categories[key] = value;
    });

  let $skip = +page * $limit - $limit;
  let { salary, jobtype, description } = categories;

  search_term && (match["title"] = search_term);
  is_remote && (match["location"] = "Remote");
  country && (match["country"] = country);
  jobtype && (match["jobtype"] = jobtype);
  salary && (match["salary"] = salary);
  description && (match["description"] = description);

  return { $limit, $skip, $match: match };
}

export const timer: timerFn = (fn, ms = 500, immFn) => {
  let timer: any = null;
  return (...args) => {
    if (typeof immFn === "function") immFn();
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(Function, args);
    }, ms);
  };
};

export function getBaseUrl() {
  if (typeof window !== "undefined" && window.location) {
    return "";
  }
  return process.env.NODE_ENV === "development"
    ? `http://localhost:${process.env.PORT ?? "3000"}`
    : process.env.VERCEL_URL;
}

export const concatQuery = (query: any): string =>
  Object.entries(query)
    .map(([key, val]) => `${key}:${val}`)
    .join("&");

export const setCookie = (name: string, value: string, exp: number): string => {
  let date = new Date();
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
  return `${name}=${value}; expires=${date.toUTCString()}; path=/`;
};

export const fetchAllJobs = async () => {
  let urls = [
    process.env.NEXT_PUBLIC_UK_DEV_JOBS ?? "",
    process.env.NEXT_PUBLIC_US_DEV_JOBS ?? "",
    process.env.NEXT_PUBLIC_SW_DEV_JOBS ?? "",
    process.env.NEXT_PUBLIC_RO_DEV_JOBS ?? "",
    process.env.NEXT_PUBLIC_NL_DEV_JOBS ?? "",
    process.env.NEXT_PUBLIC_DE_DEV_JOBS ?? "",
  ];
  return await Promise.all(urls.map(async (url) => await fetchJobs(url)({})));
};
