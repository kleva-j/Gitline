import { Container, Button } from "@mantine/core";

import Link from "next/link";

export default function FourOhFour() {
  return (
    <Container>
      <h1>404 - Page Not Found</h1>
      <Link href="/">
        <Button component="a" size="md" variant="light">
          Go Home
        </Button>
      </Link>
    </Container>
  );
}
