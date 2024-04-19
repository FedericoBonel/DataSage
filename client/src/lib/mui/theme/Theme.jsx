import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider as MUIThemeProvider, createTheme } from "@mui/material";
import { alpha, getContrastRatio } from "@mui/material/styles";
import { propTypes } from "./theme.props";

const defaultTheme = "dark";

const baseNeutralBg = "#363636";
const neutralBgMain = alpha(baseNeutralBg, 0.7);
const baseChatBg = "#1A0D26";
const baseChatBgMain = alpha(baseChatBg, 0.7);

const getDesignTokens = (mode) => ({
    palette: {
        mode,
        ...(mode === "dark"
            ? {
                  background: { default: "#40334D" },
                  neutralBg: {
                      main: neutralBgMain,
                      light: alpha(neutralBgMain, 0.5),
                      dark: alpha(neutralBgMain, 1),
                      contrastText:
                          getContrastRatio(neutralBgMain, "#fff") > 4.5
                              ? "#fff"
                              : "#111",
                  },
                  chatBg: {
                      main: baseChatBgMain,
                      light: alpha(baseChatBgMain, 0.5),
                      dark: alpha(baseChatBgMain, 1),
                      contrastText:
                          getContrastRatio(baseChatBgMain, "#fff") > 4.5
                              ? "#fff"
                              : "#111",
                  },
              }
            : {}),
    },
    components: {
        MuiButton: {
            defaultProps: {
                variant: "contained",
            },
        },
    },
});

const theme = createTheme(getDesignTokens(defaultTheme));

/**
 * Theme provider for the application. Makes the theme available down the react tree.
 *
 * It should preferably be used at the root of your component tree.
 */
const ThemeProvider = ({ children }) => {
    return (
        <MUIThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            {children}
        </MUIThemeProvider>
    );
};

ThemeProvider.propTypes = propTypes;

export default ThemeProvider;
