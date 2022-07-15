import { Navbar, Text } from "@mantine/core";

export const NavbarMenu = (props: { opened: boolean }) => {
  let { opened } = props;
  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      <Text>Application navbar</Text>
    </Navbar>
  );
};
