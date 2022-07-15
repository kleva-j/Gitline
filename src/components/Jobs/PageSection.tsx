import { Stack, Group, Select, Text, SimpleGrid } from "@mantine/core";
import { HiOutlineChevronDown } from "react-icons/hi";
import { IoFilter } from "react-icons/io5";
import { useState } from "react";
import { JobCard } from "./Card";

export const PageSection = (props: { jobs: any[], total: number }) => {
  let { jobs = [], total } = props;
  const [value, setValue] = useState<string>("recent");

  return (
    <Stack>
      <Group>
        <Text>{total} Jobs</Text>
        <Select
          placeholder="Sort By"
          size="xs"
          data={[
            { value: "recent", label: "Most recent" },
            { value: "best", label: "Best match" },
          ]}
          value={value}
          onChange={(val: string) => setValue(val)}
          icon={<IoFilter size={14} />}
          rightSection={<HiOutlineChevronDown size={14} />}
          sx={() => ({ maxWidth: 150, marginLeft: "auto" })}
          clearable
        />
      </Group>
      <SimpleGrid
        cols={3}
        spacing={30}
        breakpoints={[
          { maxWidth: 1080, cols: 3, spacing: "md" },
          { maxWidth: 890, cols: 2, spacing: "sm" },
          { maxWidth: 600, cols: 1, spacing: "sm" },
        ]}
      >
        {jobs.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </SimpleGrid>
    </Stack>
  );
};
