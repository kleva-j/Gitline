import { ColorSchemeProvider, MantineProvider, ColorScheme, LoadingOverlay } from "@mantine/core";
import { useLocalStorage, useHotkeys, useColorScheme } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { Seo } from "src/components/Seo";
import { AppCtx } from "src/context";
import { AppProps } from "next/app";

import { getBaseUrl } from "src/util";
import { Layout } from "../layout";

import Router from "next/router";

let baseUrl = getBaseUrl();

const App = ({ Component, pageProps, router }: AppProps) => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "gitline-color-scheme",
    defaultValue: useColorScheme("dark"),
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  const [visible, setVisible] = useState(false);

  const handleChange = (value: boolean) => () => setVisible(value);

  useEffect(() => {
    Router.events.on("routeChangeStart", handleChange(true));
    Router.events.on("routeChangeComplete", handleChange(false));
    Router.events.on("routeChangeError", handleChange(false));

    return () => {
      Router.events.off("routeChangeStart", handleChange(false));
      Router.events.off("routeChangeComplete", handleChange(false));
      Router.events.off("routeChangeError", handleChange(false));
    };
  }, []);

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
          <Seo canonical={baseUrl + router.asPath} />

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
