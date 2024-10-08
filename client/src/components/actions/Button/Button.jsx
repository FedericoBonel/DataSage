import { forwardRef } from "react";
import { Button as MUIButton, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { propTypes } from "./Button.props";

/**
 * Custom button component.
 * Allows handling the logic for displaying loaders, changing the component to links,
 * and more without affecting the visual style.
 *
 * In addition to the documented props, it receives any type of prop documented in the MUIButton docs.
 * @param {Object} props Props passed to the {@link https://mui.com/material-ui/api/button/ Button} from MUI.
 */
const Button = forwardRef(
    ({ children, isLoading, isLink, href, disabled, ...props }, ref) => {
        return (
            <MUIButton
                ref={ref}
                component={isLink ? Link : undefined}
                to={isLink ? href : undefined}
                disabled={isLoading ? true : disabled}
                {...props}
            >
                {isLoading ? <CircularProgress size={28} /> : children}
            </MUIButton>
        );
    }
);

Button.displayName = "Button";
Button.propTypes = propTypes;

export default Button;
