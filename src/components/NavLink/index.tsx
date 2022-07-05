import { Button, MantineSize } from "@mantine/core";
import { ReactNode } from "react";

import Link from "next/link";

interface NavLinkProps {
  href: string;
  children: string | ReactNode;
  size?: MantineSize
}

export const NavLink = ({ href, children, size = "sm" }: NavLinkProps) => {
  return (
    <Link href={href} passHref>
      <Button
        component="a"
        variant="subtle"
        size={size}
        compact
        styles={(theme) => ({
          root: {
            "&:hover": {
              color: theme.fn.darken(theme.colors.blue[3], 0.05),
              backgroundColor: "transparent",
            },
          },
        })}
      >
        {children}
      </Button>
    </Link>
  );
};
