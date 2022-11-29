import { createStitches } from "@stitches/react";

export const { getCssText: GetBaseCss } = createStitches({
  theme: {
    colors: {
      primary: "black",
    },
    fonts: {
      body: "Arial, Helvetica, sans-serif",
    },
    background: {
      primary: "red"
    }
  },
});

export const { getCssText: GetDarkCss } = createStitches({
  theme: {
    colors: {
      primary: "black",
    },
  },
});

export const { getCssText: GetLightCss } = createStitches({
  theme: {
    colors: {
      primary: "black",
    },
  },
});
