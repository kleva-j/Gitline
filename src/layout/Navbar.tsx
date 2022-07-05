import { Navbar, Text } from "@mantine/core";

interface NavbarMenuprops {
  opened: boolean;
}

export const NavbarMenu = ({ opened }: NavbarMenuprops) => {
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
