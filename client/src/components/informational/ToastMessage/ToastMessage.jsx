import { Snackbar, CircularProgress } from "@mui/material";
import { Check, Error, Warning } from "@mui/icons-material";
import propTypes from "./ToastMessage.props";

const iconsBySeverity = {
    alert: <Warning />,
    error: <Error />,
    success: <Check />,
};

/**
 * Toast message component. Wraps the MUI Snackbar
 * and receives the same props with some customizations to reduce code repetition.
 *
 * @param {Object} props Props to be passed to the {@link https://mui.com/material-ui/api/snackbar/ MUI Snackbar}
 */
const ToastMessage = ({
    autoClose,
    isLoading,
    isImportant,
    severity = "info",
    error,
    message,
    ...props
}) => {
    const action = isLoading ? (
        <CircularProgress size={22} />
    ) : (
        iconsBySeverity[severity]
    );

    return (
        <Snackbar
            key={message}
            autoHideDuration={autoClose ? 4000 : undefined}
            action={action}
            anchorOrigin={
                isImportant
                    ? { vertical: "top", horizontal: "center" }
                    : undefined
            }
            message={severity === "error" ? error?.errorMsg : message}
            {...props}
        />
    );
};

ToastMessage.propTypes = propTypes;

export default ToastMessage;
