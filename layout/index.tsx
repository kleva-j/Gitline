import { AppShell, useMantineTheme, Container } from "@mantine/core";
import { FooterMenu, PageHeader } from "src/layout";
import { ReactNode } from "react";

interface LayoutProps {
  children?: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
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
      {children}
    </AppShell>
  );
};
