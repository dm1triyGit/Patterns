import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { CssBaseline, PaletteMode } from "@mui/material";
import { createTheme, Theme, ThemeProvider } from "@mui/material/styles";
import { StorageKeys } from "@app/shared/assets";

declare module "@mui/material/styles" {
  interface Palette {
    alt: { beje: string; lightBlue: string };
    misc: Palette["primary"];
  }
  interface PaletteOptions {
    alt: { beje: string; lightBlue: string };
    misc: PaletteOptions["primary"];
  }
  interface BreakpointOverrides {
    lmd: true;
  }
}

type ContextProps = {
  mode: PaletteMode;
  toggleColorMode: () => void;
  theme: Theme;
};

interface Props {
  children: JSX.Element;
}

export const ThemeStoreContext = createContext<Partial<ContextProps>>({});
export function useCustomTheme(): Partial<ContextProps> {
  return useContext(ThemeStoreContext);
}

export const ThemeStoreProvider = ({ children }: Props): JSX.Element => {
  const [mode, setMode] = useState<PaletteMode>("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem(StorageKeys.THEME) as PaletteMode;

    if (storedTheme) {
      setMode(storedTheme);
    }
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        breakpoints: {
          values: {
            xs: 0,
            sm: 360,
            md: 600,
            lmd: 768,
            lg: 1128,
            xl: 1440,
          },
        },
        palette: {
          mode,
          primary: {
            main: "#3FC3D0",
            light: "#B1EBF0",
            dark: "#12A5B3",
            contrastText: "#ffffff",
          },
          text: {
            primary: "#071530",
            secondary: "#848998",
            disabled: "#B9BFCC",
          },
          secondary: {
            main: "#203E7A",
            light: "#284E99",
            dark: "#172D58",
          },
          background: {
            default: "#ffffff",
          },
          alt: {
            beje: "#FCF7F3",
            lightBlue: "#EEFAFB",
          },
          misc: {
            main: "#F0FBFB",
            light: "#F6F8FB",
            dark: "#DDE3EF",
          },
          error: {
            main: "#EB5E55",
          },
          success: {
            main: "#1B9D46",
          },
        },
      }),
    [mode]
  );

  const toggleColorMode = (): void => {
    setMode((prev) => {
      const newMode = prev === "light" ? "dark" : "light";
      localStorage.setItem(StorageKeys.THEME, newMode);

      return newMode;
    });
  };

  const value = useMemo(
    () => ({
      mode,
      toggleColorMode,
      theme,
    }),
    [mode, theme]
  );

  return (
    <ThemeStoreContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeStoreContext.Provider>
  );
};
