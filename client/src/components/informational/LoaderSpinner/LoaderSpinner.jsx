import { Box, CircularProgress, Typography } from "@mui/material";
import { createContainerStyles } from "./LoaderSpinner.styles";
import { propTypes } from "./LoaderSpinner.props";

/** Renders a spinner. It should be used to indicate that the application is loading or processing data. */
const LoaderSpinner = ({ message, disablePadding = true }) => {
    const containerStyles = createContainerStyles(disablePadding);

    return (
        <Box sx={containerStyles}>
            {message && <Typography>{message}</Typography>}
            <CircularProgress />
        </Box>
    );
};

LoaderSpinner.propTypes = propTypes;

export default LoaderSpinner;
