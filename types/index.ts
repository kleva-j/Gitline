import { ParsedUrlQuery } from "querystring";
import { MantineSize } from "@mantine/core";
import { AxiosRequestConfig } from "axios";
import { ReactNode } from "react";

export type PaginationData = {
  page: number;
  lastPage: number;
  isLastPage: boolean;
  total: number;
};

export type JobResult = {
  jobs: Job[];
  pagination: PaginationData;
};

export type Response = {
  success: boolean;
  statusCode: number;
  message: string;
  result: JobResult;
};

export interface Params {
  offset?: number;
  limit?: number;
}

export interface JobsPage {
  jobs: Job[];
  pagination: PaginationData;
}

export interface NavLinkProps {
  href: string;
  children: string | ReactNode;
  size?: MantineSize;
}

export type jobsType = Record<string, any>;

export type JobSources = {
  [key: string]: (params: AxiosRequestConfig) => Promise<Job>;
};

export interface Job {
  id: string;
  logo: string;
  title: string;
  jobtype: string;
  apply_url: string;
  category: string;
  city: string;
  company: string;
  country: string;
  description: string;
  ispromoted: boolean;
  link: string;
  location: string;
  name: string;
  postal_code: string;
  postcode: string;
  pubdate: string;
  region: string;
  salary: string;
  url: string;
}

export enum sortBy {
  best_match = "best_match",
  most_recent = "most_recent",
}

export interface Query extends ParsedUrlQuery {
  category: string;
  sort_by: sortBy;
  search_term: string;
  page: string;
  is_remote: string;
}

export type $match = {
  [key in match]?: string;
};

export enum match {
  title = "title",
  salary = "salary",
  jobtype = "jobtype",
  location = "location",
  description = "description",
}

export type aggregatedQuery = {
  offset: number;
  limit: number;
  match?: $match;
};

export type timerFn = (
  fn: (...args: any[]) => void,
  ms: number,
  immFn?: () => void | null
) => (...args: any[]) => void;
