import { Group, Badge, Image, Text, Card, Stack, Grid, Title } from "@mantine/core";
import { formatSalary } from "src/util";

interface JobCardProps {
  id: string;
  logo: string;
  title: string;
  jobtype: string;
  apply_url: string;
  category: string;
  city: string;
  company: string;
  country: string;
  description: string;
  ispromoted: boolean;
  link: string;
  location: string;
  name: string;
  postal_code: string;
  postcode: string;
  pubdate: string;
  region: string;
  salary: string;
  url: string;
}

export const JobCard = ({
  title,
  logo,
  pubdate,
  company,
  salary,
}: JobCardProps) => {
  return (
    <Card shadow="sm" p="lg" component="a" radius="md">
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
            <Title order={5}>
              {title.split("[")[0]}
            </Title>

            <Text weight={500} size="md" my={10}>
              {company}
            </Text>
            <Text size="sm">{formatSalary(salary)}</Text>

            <Group spacing="xs" mt="auto">
              <Badge color="orange" size="xs">
                Full-time
              </Badge>
              <Badge variant="dot" size="xs">JavaScript</Badge>
              <Badge variant="dot" size="xs">React</Badge> 
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
  );
};
