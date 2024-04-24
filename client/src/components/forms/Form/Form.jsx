import { Box } from "@mui/material";
import { Button } from "@/components/actions";
import { messages } from "@/utils/constants";
import { ActionButtonWrapperStyles } from "./Form.styles";
import propTypes from "./Form.props";

/**
 * Component of a form. It renders the children and the accept and cancel buttons and handles their disable state
 * and show loaders when submitting.
 * @param {object} props Besides the documented props it can receive any other props to be forwarded to the component passed.
 */
const Form = ({
    component: Component,
    children,
    buttonsWrapper,
    buttonsLabels = {
        submit: messages.actions.form.SUBMIT,
        cancel: messages.actions.form.CANCEL,
    },
    buttonsColor = {
        submit: "primary",
        cancel: "error",
    },
    onSubmit,
    isSubmitting,
    canSubmit,
    onCancel,
    ...componentProps
}) => {
    const ComponentToRender = Component || Box;
    const actionButtonsStyles = buttonsWrapper
        ? undefined
        : ActionButtonWrapperStyles;

    return (
        <ComponentToRender
            {...componentProps}
            component="form"
            onSubmit={onSubmit}
        >
            {children}
            <Box sx={actionButtonsStyles} component={buttonsWrapper}>
                <Button
                    type="submit"
                    isLoading={isSubmitting}
                    disabled={!canSubmit}
                    variant="text"
                    color={buttonsColor.submit}
                >
                    {buttonsLabels.submit}
                </Button>
                {buttonsLabels.cancel && (
                    <Button
                        variant="text"
                        onClick={onCancel}
                        color={buttonsColor.cancel}
                    >
                        {buttonsLabels.cancel}
                    </Button>
                )}
            </Box>
        </ComponentToRender>
    );
};

Form.propTypes = propTypes;

export default Form;
