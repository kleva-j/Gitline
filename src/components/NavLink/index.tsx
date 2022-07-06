import { Button, MantineSize } from "@mantine/core";
import { ReactNode } from "react";

import Link from "next/link";
import { colorMixer } from "src/util";

interface NavLinkProps {
  href: string;
  children: string | ReactNode;
  size?: MantineSize;
}

export const NavLink = ({ href, children, size = "sm" }: NavLinkProps) => {
  return (
    <Link href={href} passHref>
      <Button
        component="a"
        variant="subtle"
        size={size}
        compact
        styles={(theme) => {
          const { light, dark } = colorMixer(theme, "blue", "yellow");
          return {
            root: {
              "&:hover": {
                color: light,
                backgroundColor: "transparent",
              },
              color: dark,
            },
          };
        }}
      >
        {children}
      </Button>
    </Link>
  );
};
