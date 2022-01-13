import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import AuthProvider from "../hooks/provider/authProvider";
import { theme } from "../styles/theme";
import Head from "next/head";
import "../styles/globals.css";
import MenuProvider from "../hooks/provider/menuProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <MenuProvider>
          <Head>
            <title>家計簿アプリ</title>
            <link rel="shortcut icon" href="/images/ie.png" />
          </Head>
          <Component {...pageProps} />
        </MenuProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}
export default MyApp;
