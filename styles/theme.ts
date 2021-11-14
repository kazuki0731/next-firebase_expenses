import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily:
          "'游ゴシック体', YuGothic, '游ゴシック', 'Yu Gothic', 'メイリオ', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', sans-serif",
        bg: "gray.200",
        textAlign: "center",
        fontSize: { base: "1rem", sm: "1.25rem", md: "1.5rem", lg: "1.75rem" },
        margin: "0 auto",
      },
    },
  },
  colors: {
    primary: {
      100: "#2CB8D1",
      200: "#51C1D5",
    },
    accent: {
      50: "#fffbdbde",
      100: "#FCD81E",
      500: "#FCD81E", //colorScheme用
    },
    text: {
      100: "#082024",
      200: "#000F0F8A",
    },
    background: "#F6FDFF",
  },
});
