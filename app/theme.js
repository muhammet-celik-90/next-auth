'use client'

import { createTheme } from "@mui/material";
import { Poppins } from "next/font/google";
import { createContext, useMemo, useState } from "react";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
/* 
const theme = createTheme({
  typography: {
    fontFamily: poppins,
  },
}); */

//mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            background: {
              default: "#2B3230",
            },
          }
        : {
            background: {
              default: "#E5F2E7",
            },
            primary: {
              main: "#2B3230"
            }
          }),
    },
    typography: {
      fontFamily: poppins,
      button: {
        fontFamily: poppins,
      }
    },
  };
};

//context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
};
