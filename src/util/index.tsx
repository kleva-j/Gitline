import axios, { AxiosRequestConfig } from "axios";

export function fetchJobs(url: string) {
  return async function (params: AxiosRequestConfig) {
    return (await axios.get(url, { ...params })).data;
  };
}
