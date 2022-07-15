import { AppShell, useMantineTheme } from "@mantine/core";
import { FooterMenu, PageHeader } from "src/layout";
import { ReactNode } from "react";

export const Layout = (props: { children?: ReactNode }) => {
  const theme = useMantineTheme();
  return (
    <AppShell
      styles={{
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      fixed
      header={<PageHeader />}
      footer={<FooterMenu />}
    >
      {props.children}
    </AppShell>
  );
};
