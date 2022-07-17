import { Pagination, Container, Center, Stack } from "@mantine/core";

import { PageSection } from "./PageSection";
import { JobFilters } from "./JobFilters";
import { PageHeader } from "./PageHeader";
import { JobsPage } from "../../../types";
import { SearchBar } from "./Searchbar";

interface JobsComponentProp extends JobsPage {}

export const JobsComponent = (props: JobsComponentProp) => {
  const { jobs, pagination } = props;
  let { page, total, lastPage } = pagination;

  return (
    <Container size="xl">
      <PageHeader>
        <Stack>
          <SearchBar />
          <JobFilters />
        </Stack>
      </PageHeader>
      <PageSection jobs={jobs} total={total} />
      <Center>
        <Pagination page={page} total={lastPage} size="sm" py={50} />
      </Center>
    </Container>
  );
};
