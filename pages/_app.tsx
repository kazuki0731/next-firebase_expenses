import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import AuthProvider from "../hooks/authProvider";
import { theme } from "../styles/theme";
import { RecoilRoot } from "recoil";
import DataProvider from "../hooks/dataProvider";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <RecoilRoot>
        <AuthProvider>
          <DataProvider>
            <RecoilRoot>
              <Head>
                <title>TopPage</title>
                <link rel="shortcut icon" href="/images/ie.png" />
              </Head>
              <Component {...pageProps} />
            </RecoilRoot>
          </DataProvider>
        </AuthProvider>
      </RecoilRoot>
    </ChakraProvider>
  );
}
export default MyApp;
