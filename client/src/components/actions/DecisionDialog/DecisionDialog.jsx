import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import Button from "../Button";
import { messages } from "@/utils/constants";
import propTypes from "./DecisionDialog.props";

/** Component that renders a decision dialog with two options. */
const DecisionDialog = ({
    children,
    title,
    isOpen,
    onClose,
    onAccept,
    isAccepting,
    buttonLabels = {
        accept: messages.actions.decision.ACCEPT,
        cancel: messages.actions.decision.CANCEL,
    },
}) => {
    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="error" variant="text">
                    {buttonLabels.cancel}
                </Button>
                <Button
                    onClick={onAccept}
                    isLoading={isAccepting}
                    color="primary"
                    variant="text"
                >
                    {buttonLabels.accept}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

DecisionDialog.propTypes = propTypes;

export default DecisionDialog;
