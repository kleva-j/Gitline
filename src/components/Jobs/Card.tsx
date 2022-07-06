import { Card, Text } from "@mantine/core";

export const JobCard = () => {
  return (
    <Card shadow="sm" p="xl" component="a">
      <Card.Section></Card.Section>
      <Card.Section>
        <Text weight={500} size="lg">
          {"You've won a million dollars in cash!"}
        </Text>

        <Text size="sm">
          Please click anywhere on this card to claim your reward, this is not a
          fraud, trust us
        </Text>
      </Card.Section>
      <Card.Section></Card.Section>
    </Card>
  );
};
