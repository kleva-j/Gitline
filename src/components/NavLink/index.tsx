import { Button } from "@mantine/core";
import { colorMixer } from "src/util";

import Link from "next/link";

import { NavLinkProps } from '../../../types';

export const NavLink = ({ href, children, size = "sm" }: NavLinkProps) => {
  return (
    <Link href={href} passHref>
      <Button
        component="a"
        variant="subtle"
        size={size}
        compact
        styles={(theme) => {
          const { dark, darker } = colorMixer(theme, "blue", "yellow");
          return {
            root: {
              color: dark,
              "&:hover": {
                color: darker,
                backgroundColor: "transparent",
              },
            },
          };
        }}
      >
        {children}
      </Button>
    </Link>
  );
};
