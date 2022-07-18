import { Container, Stack, Title, Table } from "@mantine/core";
import { GetServerSideProps, NextPage } from "next";

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
    browser: string;
    cpu: string;
    isBot: boolean;
    os: string;
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
        <Table horizontalSpacing="xl" verticalSpacing="xs" highlightOnHover>
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
              <th>IsBot</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(({ url, ip, time, geo, ua }, index) => (
              <tr key={url + index}>
                <td>{url}</td>
                <td>{ip}</td>
                <td>{time}</td>
                <td>{geo.country}</td>
                <td>{geo.region}</td>
                <td>{geo.city}</td>
                <td>{geo.longitude}</td>
                <td>{geo.latitude}</td>
                <td>{String(ua.isBot)}</td>
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
