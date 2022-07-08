import {
  Autocomplete,
  Container,
  TextInput,
  Checkbox,
  Button,
  Select,
  Group,
  Stack,
  Grid,
} from "@mantine/core";
import { BiSearch } from "react-icons/bi";
import { colorMixer } from "src/util";

import { PageSection } from "./PageSection";
import { PageHeader } from "./PageHeader";

interface JobsComponentProps {
  jobs: any[];
}
export const JobsComponent = ({ jobs }: JobsComponentProps) => {
  return (
    <Container size="xl">
      <PageHeader>
        <Stack>
          <Grid columns={12} grow sx={{ maxWidth: 800 }}>
            <Grid.Col span={10}>
              <Autocomplete
                size="md"
                radius="md"
                limit={2}
                placeholder="Search for jobs"
                icon={<BiSearch size={18} />}
                data={['React', 'Angular', 'Svelte', 'Vue']}
              />
            </Grid.Col>
            <Grid.Col span={2}>
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
                Search
              </Button>
            </Grid.Col>
          </Grid>
          <Group>
            <Select
              placeholder="Experience level"
              size="xs"
              data={[
                { value: "intern", label: "Intern" },
                { value: "junior", label: "Junior" },
                { value: "mid-level", label: "Mid-level" },
                { value: "senior", label: "Senior" },
                { value: "lead", label: "Technical Lead" },
              ]}
              clearable
            />
            <Select
              placeholder="Salary"
              size="xs"
              data={[
                { value: "1", label: "￡25k - ￡35k" },
                { value: "2", label: "￡35k - ￡45k" },
                { value: "3", label: "￡45k - ￡60k" },
                { value: "4", label: "￡60k - ￡75k" },
                { value: "5", label: "￡75k - ￡90k" },
                { value: "6", label: "￡90k - ￡110k" },
                { value: "7", label: "￡110k - ￡130k" },
              ]}
              clearable
            />
            <Select
              placeholder="Job type"
              size="xs"
              data={[
                { value: "full-time", label: "Full time" },
                { value: "part-time", label: "Part time" },
                { value: "contractor", label: "Contractor" },
                { value: "intern", label: "Intern" },
                { value: "volunteer", label: "Volunteer" },
              ]}
              clearable
            />
            <Checkbox label="Remote" size="xs" />
          </Group>
        </Stack>
      </PageHeader>
      <PageSection jobs={jobs} />
    </Container>
  );
};
