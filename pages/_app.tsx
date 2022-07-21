import { ColorSchemeProvider, MantineProvider, ColorScheme, LoadingOverlay } from "@mantine/core";
import { useLocalStorage, useHotkeys, useColorScheme } from "@mantine/hooks";
import { Seo } from "src/components/Seo";
import { AppCtx } from "src/context";
import { AppProps } from "next/app";
import { useState } from "react";

import { Layout } from "../layout";

const base = process.env.NEXT_PUBLIC_BASE_URI || "";

const App = ({ Component, pageProps, router }: AppProps) => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "gitline-color-scheme",
    defaultValue: useColorScheme(),
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  const [visible, setVisible] = useState(false);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme, fontFamily: "Lato, Roboto" }}
      >
        <AppCtx.Provider
          value={{
            name: "Gitline",
            author: "kasmickleva",
            overlayVisible: visible,
            setOverlayVisible: (val) => setVisible(val),
          }}
        >
          <Seo canonical={base + router.asPath} />

          <div
            style={{
              position: visible ? "fixed" : "relative",
              height: "100vh",
            }}
          >
            <LoadingOverlay visible={visible} />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </div>
        </AppCtx.Provider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default App;
