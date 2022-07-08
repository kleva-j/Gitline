import axios, { AxiosRequestConfig } from "axios";
import { MantineTheme } from "@mantine/core";

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
    .map((val) => parseInt(val))
  return `£${min}k - £${max}k`
};
