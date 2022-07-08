import { ColorSchemeProvider, MantineProvider, ColorScheme } from "@mantine/core";
import { useLocalStorage, useHotkeys, useColorScheme } from "@mantine/hooks";
import { AppProps, AppContext } from "next/app";
import { Seo } from "src/components/Seo";
import { Layout } from "../layout";

const App = ({ Component, pageProps }: AppProps) => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "gitline-color-scheme",
    defaultValue: useColorScheme(),
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <>
      <Seo />
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme, fontFamily: 'Roboto', }}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
};

const base = process.env.BASE_URI || "";

App.getInitialProps = async function ({ router }: AppContext): Promise<any> {
  return { canonical: base + router.asPath };
};

export default App;
