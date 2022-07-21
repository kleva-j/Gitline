import {
  useMantineColorScheme,
  ActionIcon,
  Container,
  Header,
  Title,
  Group,
} from "@mantine/core";
import { NavLink } from "src/components/NavLink";
import { BsMoonStars } from "react-icons/bs";
import { IoHome } from "react-icons/io5";
import { useRouter } from "next/router";
import { FiSun } from "react-icons/fi";

export const PageHeader = () => {
  let { colorScheme, toggleColorScheme } = useMantineColorScheme();
  let [, baseRoute] = useRouter().pathname.split("/");
  let dark = colorScheme === "dark";

  return (
    <Header height={70} p="md">
      <Container
        size="xl"
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        <Title order={3}>Gitline</Title>
        <Group>
          {baseRoute && (
            <NavLink size="lg" href="/">
              <IoHome />
            </NavLink>
          )}
          {baseRoute !== "jobs" && <NavLink href="/jobs">Jobs</NavLink>}
          <ActionIcon
            variant="outline"
            color={dark ? "yellow" : "blue"}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
          >
            {dark ? <FiSun size={18} /> : <BsMoonStars size={18} />}
          </ActionIcon>
        </Group>
      </Container>
    </Header>
  );
};
