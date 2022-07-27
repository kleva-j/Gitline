import { Container, Paper, Text, Title, Button, Group } from "@mantine/core";
import { BsArrowLeft } from "react-icons/bs";
import { useRouter } from "next/router";
import { colorMixer } from "src/util";

import { JobCardProps } from "../../../types";

interface JobProps extends JobCardProps {}

export const Job = (props: JobProps) => {
  const { title, description, url } = props;
  const router = useRouter();

  return (
    <Container>
      <Button
        leftIcon={<BsArrowLeft />}
        variant="light"
        compact
        mt="2rem"
        sx={(theme) => {
          const { dark, darker } = colorMixer(theme);
          return {
            color: dark,
            backgroundColor: "transparent",
            "&:hover": {
              color: darker,
              backgroundColor: "transparent",
            },
          };
        }}
        onClick={() => router.back()}
      >
        Go Back
      </Button>
      <Group position="apart" my="1.5rem">
        <Title order={1}>{title.split("[")[0]}</Title>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginLeft: "auto" }}
        >
          <Button
            sx={(theme) => ({
              color: colorMixer(theme).dark,
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[6]
                  : theme.colors.blue[0],
              "&:hover": {
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.fn.lighten(theme.colors.blue[1], 0.09),
              },
            })}
            radius="md"
            size="md"
          >
            Apply here
          </Button>
        </a>
      </Group>
      <Paper shadow="xs" px="md" py="sm">
        <Text>
          <div dangerouslySetInnerHTML={{ __html: description }}></div>
        </Text>
      </Paper>
    </Container>
  );
};

export default Job;
