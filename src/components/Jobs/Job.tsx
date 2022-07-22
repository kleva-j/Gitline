import { Container, Paper, Text, Title, Button } from "@mantine/core";
import { BsArrowLeft } from "react-icons/bs";
import { colorMixer } from "src/util";

import { JobCardProps } from "../../../types";

import Link from "next/link";

interface JobProps extends JobCardProps {}

export const Job = (props: JobProps) => {
  const { title, description } = props;

  return (
    <Container>
      <Link href="/jobs">
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
        >
          Go Back
        </Button>
      </Link>
      <Title my="1.5rem" order={1}>
        {title.split("[")[0]}
      </Title>
      <Paper shadow="xs" px="md" py="sm">
        <Text>
          <div dangerouslySetInnerHTML={{ __html: description }}></div>
        </Text>
      </Paper>
    </Container>
  );
};

export default Job;
