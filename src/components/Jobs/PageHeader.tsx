import { Stack, Text, Title, Space, useMantineTheme } from "@mantine/core";
import { locationMap } from "pages/jobs";
import { useRouter } from "next/router";
import { colorMixer } from "src/util";
import { ReactNode } from "react";

export const PageHeader = (props: { children?: ReactNode }) => {
  const { query: { location } } = useRouter();
  const theme = useMantineTheme();
  const { dark } = colorMixer(theme);
  return (
    <Stack sx={{ height: 280, paddingTop: "2rem" }}>
      <Title order={1}>
        Explore{" "}
        <Text color={dark} inherit component="span">
          Popular Jobs
        </Text>{" "}
        in {" "}
        <Text inherit component="span" color={"yellow"}>
          {locationMap[location as string]}
        </Text>
      </Title>
      <Text color="gray">
        Discover jobs most relevant to you by Experience level, salary,
        location, job type, etc.
      </Text>

      <Space />
      {props.children}
    </Stack>
  );
};
