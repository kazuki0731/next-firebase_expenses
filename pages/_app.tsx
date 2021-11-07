import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

import Header from "../components/header";
import AuthProvider from "../hooks/authProvider";
import { theme } from "../styles/theme";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <RecoilRoot>
          <Header />
          <Component {...pageProps} />
        </RecoilRoot>
      </AuthProvider>
    </ChakraProvider>
  );
}
export default MyApp;
