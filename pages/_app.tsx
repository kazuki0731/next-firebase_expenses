import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import AuthProvider from "../hooks/provider/authProvider";
import { theme } from "../styles/theme";
import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Head>
          <title>家計簿アプリ</title>
          <link rel="shortcut icon" href="/images/ie.png" />
        </Head>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}
export default MyApp;
