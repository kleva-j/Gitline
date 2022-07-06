import { Footer, Container, Text, Title } from "@mantine/core";

export const FooterMenu = () => {
  return (
    <Footer height={60} p="md">
      <Container size="xl" style={{ display: "flex" }}>
        <Title style={{ fontSize: "11px" }} order={6}>Built by <Text size="sm" color="yellow" underline inherit component="span">Kasmickleva</Text></Title>
      </Container>
    </Footer>
  );
};
