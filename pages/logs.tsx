import { Container, Stack, Title, Table } from "@mantine/core";
import { GetServerSideProps, NextPage } from "next";
import { colorMixer } from "src/util";

import redis from "lib/redis";

type log = {
  geo: {
    city: string;
    country: string;
    latitude: string;
    longitude: string;
    region: string;
  };
  ip: string;
  time: string;
  ua: {
    browser: {
      name: string;
    };
    cpu: string;
    isBot: boolean;
    os: {
      name: string;
    };
    ua: string;
  };
  url: string;
};

interface LogsPageProps {
  logs: log[];
}

const Logs: NextPage<LogsPageProps> = ({ logs }) => {
  return (
    <Container size="xl">
      <Stack pt="4rem">
        <Title order={1}>Requests Logs</Title>
        <Table
          horizontalSpacing="xl"
          verticalSpacing="xs"
          highlightOnHover
          sx={(theme) => ({
            td: {
              color: colorMixer(theme).dark,
              "&.ip": {
                color: colorMixer(theme, "red", "orange").dark
              },
              "&.country": {
                color: colorMixer(theme, "lime", "violet").dark
              },
              "&.city": {
                color: colorMixer(theme, "violet", "lime").dark
              },
              "&.browser": {
                color: colorMixer(theme, "cyan", "grape").dark
              },
              "&.os": {
                color: colorMixer(theme, "grape", "pink").dark
              },
              "&.isBot": {
                color: colorMixer(theme, "green", "gray").dark
              },
            },
          })}
        >
          <thead>
            <tr>
              <th>Url</th>
              <th>Ip Address</th>
              <th>Time</th>
              <th>Country</th>
              <th>Region</th>
              <th>City</th>
              <th>Longitude</th>
              <th>Latitude</th>
              <th>Browser</th>
              <th>OS</th>
              <th>IsBot</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(({ url, ip, time, geo, ua }, index) => (
              <tr key={url + index}>
                <td className="url">{url}</td>
                <td className="ip">{ip}</td>
                <td className="time">{time}</td>
                <td className="country">{geo.country}</td>
                <td className="region">{geo.region}</td>
                <td className="city">{geo.city}</td>
                <td className="lng">{geo.longitude}</td>
                <td className="lat">{geo.latitude}</td>
                <td className="browser">{ua.browser.name}</td>
                <td className="os">{ua.os.name}</td>
                <td className="isBot">{String(ua.isBot)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Stack>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  let redis_key = process.env.UPSTASH_REDIS_KEY ?? "";
  return { props: { logs: await redis.lrange(redis_key, 0, -1) } };
};

export default Logs;
