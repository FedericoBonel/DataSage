import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider as MUIThemeProvider, createTheme } from "@mui/material";
import { propTypes } from "./theme.props";

const theme = createTheme({
    components: {
        MuiButton: {
            defaultProps: {
                variant: "contained",
            },
        },
    },
});

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
