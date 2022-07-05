import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { useLocalStorage, useHotkeys, useColorScheme } from '@mantine/hooks';
import { AppProps, AppContext } from "next/app";
import { Seo } from "src/components/Seo";
import { Layout } from 'layout';

const App = (props: AppProps) => {
  const { Component, pageProps } = props;
  const preferredColorScheme = useColorScheme()
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: preferredColorScheme,
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

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
          theme={{ colorScheme }}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
};

const base = "http://localhost:3000";

App.getInitialProps = async function ({ router }: AppContext): Promise<any> {
  return { canonical: base + router.asPath };
};

export default App;
