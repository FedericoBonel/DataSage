import { api } from "@/utils/constants";
import propTypes from "prop-types";

export default {
    /** The permissions that should be activated in the form */
    assignedPermissions: propTypes.shape({
        /** The read documents permission and its activated state in its value */
        [api.validation.participants.allowedActions.READ_DOCS]: propTypes.bool.isRequired,
        /** The upload documents permission and its activated state in its value */
        [api.validation.participants.allowedActions.UPLOAD_DOCS]: propTypes.bool.isRequired,
    }).isRequired,
    /** The function to be executed when a change in one of the switches occurs, it receives the event as parameter with the name of the permission on it and its checked state. */
    onChangePermission: propTypes.func.isRequired,
}