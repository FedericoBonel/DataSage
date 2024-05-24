import { Backdrop } from "@mui/material";

import LoaderSpinner from "@/components/informational/LoaderSpinner";
import propTypes from "./ShowLoader.props";

/** Shows a loader fallback when its children are loading. */
const ShowLoader = ({
    children,
    isLoading,
    message,
    fallback,
    disablePadding = false,
    variant,
    fallbackProps,
}) => {
    const fallbackToShow =
        fallback ?? variant === "dialog" ? (
            <Backdrop
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                {...fallbackProps}
            >
                <LoaderSpinner />
            </Backdrop>
        ) : (
            <LoaderSpinner
                {...fallbackProps}
                disablePadding={disablePadding}
                message={message}
            />
        );

    return isLoading ? fallbackToShow : children;
};

ShowLoader.propTypes = propTypes;

export default ShowLoader;
