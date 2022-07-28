import {
  Group,
  Badge,
  Image,
  Stack,
  Title,
  Text,
  Card,
  Grid,
} from "@mantine/core";
import { formatSalary } from "src/util";
import { useRouter } from 'next/router';

import { JobCardProps } from "../../../types";

import Link from "next/link";

interface Props extends JobCardProps {
  onClick: () => void;
}

export const JobCard = (props: Props) => {
  const { id, title, logo, company, salary, onClick } = props;
  let { query: { location } } = useRouter();

  return (
    <Link href={`/jobs/${location}/${id}`}>
      <Card
        shadow="sm"
        p="lg"
        radius="md"
        component="a"
        sx={(theme) => ({
          cursor: "pointer",
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
          "&:hover": {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[5]
                : theme.fn.lighten(theme.colors.gray[1], 0.09),
          },
        })}
        onClick={onClick}
      >
        <Grid sx={{ height: "100%" }}>
          <Grid.Col span={1} px={0}>
            <Image
              width={30}
              height={30}
              src={logo}
              alt="company logo"
              radius="lg"
            />
          </Grid.Col>

          <Grid.Col span={8}>
            <Stack justify="space-between" sx={{ height: 150 }} spacing={0}>
              <Title order={5}>{title.split("[")[0]}</Title>

              <Text weight={500} size="md" my={10}>
                {company}
              </Text>
              <Text size="sm">{formatSalary(salary)}</Text>

              <Group spacing="xs" mt="auto">
                <Badge color="orange" size="xs">
                  Full-time
                </Badge>
                <Badge variant="dot" size="xs">
                  JavaScript
                </Badge>
                <Badge variant="dot" size="xs">
                  React
                </Badge>
              </Group>
            </Stack>
          </Grid.Col>

          <Grid.Col span={3}>
            <Text size="xs" align="right">
              2 hours ago
            </Text>
          </Grid.Col>
        </Grid>
      </Card>
    </Link>
  );
};
