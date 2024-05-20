import { Alert as MUIAlert, AlertTitle, Typography } from "@mui/material";

import propTypes from "./FormAlert.props";

/** Form error component. Displays the main error message and any sub-errors if they exist. */
const FormAlert = ({ error }) => {
    return (
        <MUIAlert severity="error">
            <AlertTitle>{error?.errorMsg}</AlertTitle>
            {error?.errors?.map((error, index) => (
                <Typography variant="caption" key={index} color="text">
                    {error.msg}
                </Typography>
            ))}
        </MUIAlert>
    );
};

FormAlert.propTypes = propTypes;

export default FormAlert;