import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily:
          "'游ゴシック体', YuGothic, '游ゴシック', 'Yu Gothic', 'メイリオ', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', sans-serif",
        bg: "blue.50",
        textAlign: "center",
        fontSize: { base: "1rem", sm: "1.25rem", md: "1.5rem", lg: "1.5rem" },
        margin: "0 auto",
      },
    },
  },
});
