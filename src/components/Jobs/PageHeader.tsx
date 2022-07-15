import { Stack, Text, Title, Space, useMantineTheme } from "@mantine/core";
import { colorMixer } from "src/util";
import { ReactNode } from "react";

export const PageHeader = (props: { children?: ReactNode }) => {
  const theme = useMantineTheme();
  const { dark } = colorMixer(theme);
  return (
    <Stack
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[8]
            : theme.colors.gray[0],
        height: 300,
        paddingTop: "4rem",
      })}
    >
      <Title order={1}>Explore <Text color={dark} inherit component="span">Popular Jobs</Text></Title>
      <Text color="gray">
        Discover jobs most relevant to you by Experience level, salary,
        location, job type, etc.
      </Text>

      <Space />
      {props.children}
    </Stack>
  );
};
