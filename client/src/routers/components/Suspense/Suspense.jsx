import { Suspense as ReactSuspense } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { SpinnerContainerStyles, SpinnerStyles } from "./Suspense.styles";
import propTypes from "./Suspense.props";

/** Lets you display a fallback until its children have finished loading */
const Suspense = ({ children }) => {
    return (
        <ReactSuspense
            fallback={
                <Box sx={SpinnerContainerStyles}>
                    <CircularProgress size={64} sx={SpinnerStyles} />
                </Box>
            }
        >
            {children}
        </ReactSuspense>
    );
};

Suspense.propTypes = propTypes;

export default Suspense;
