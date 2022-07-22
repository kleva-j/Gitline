import { Pagination, Container, Center, Stack, Title } from "@mantine/core";
import { GetServerSideProps, NextPage } from "next";
import { LogsComponent } from "src/components/Logs";
import { useRouter } from "next/router";

import redis from "lib/redis";

import { LogsPageProps } from "../types";

const Logs: NextPage<LogsPageProps> = ({ logs }) => {
  let { query, push } = useRouter();
  let { page = 1 } = query;
  let limit = 10, offset = +page * limit - limit;

  const handleNavigate = (num: number) => {
    let url = `/logs?page=${num}`;
    push(url, url, { shallow: true });
  };

  return (
    <Container size="xl">
      <Stack pt="2rem">
        <Title order={1}>Requests Logs</Title>
        <LogsComponent logs={logs.slice(offset, offset + limit)} />
        <Center>
          <Pagination
            page={+page}
            total={Math.ceil(logs.length / limit)}
            onChange={handleNavigate}
            size="md"
            py={10}
          />
        </Center>
      </Stack>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  let redis_key = process.env.UPSTASH_REDIS_KEY ?? "";
  return { props: { logs: await redis.lrange(redis_key, 0, -1) } };
};

export default Logs;
