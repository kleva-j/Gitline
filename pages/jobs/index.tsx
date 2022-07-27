import { Center, Select, Title } from "@mantine/core";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";

export let locationMap: Record<string, string> = {
  uk: "United Kingdom",
  us: "United States",
  nl: "Netherlands",
  sw: "Switzerland",
  de: "Germany",
  ro: "Romania",
};

const Jobs: NextPage = () => {
  const router = useRouter();

  return (
    <Center mt="4rem">
      <Title order={1}>Please set location</Title>
      <Select
        label="Select a preferred location for Tech jobs"
        placeholder="Pick one"
        data={Object.entries(locationMap).map(([key, value]) => ({
          value: key,
          label: value,
        }))}
        onChange={(value) => router.push(`/jobs/${value}`)}
      />
    </Center>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { location = "" } = req.cookies;
  let hasKeys = Object.keys(locationMap).includes(location);

  return {
    ...(hasKeys
      ? {
          redirect: {
            permanent: true,
            destination: `/jobs/${location}`,
          },
        }
      : {}),
    props: {},
  };
};

export default Jobs;
