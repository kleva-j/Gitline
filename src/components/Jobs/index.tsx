import { Container } from "@mantine/core";

import { PageSection } from "./PageSection";
import { PageHeader } from "./PageHeader";

interface JobsComponentProps {
  jobs: any[];
}

export const JobsComponent = ({ jobs }: JobsComponentProps) => {
  console.log(jobs)
  return (
    <Container size="xl">
      <PageHeader />
      <PageSection />
    </Container>
  );
};
