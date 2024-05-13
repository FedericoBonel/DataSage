import { List, ListItem, ListItemText, Switch } from "@mui/material";
import { messages, api } from "@/utils/constants";
import propTypes from "./PermissionsParticipantsForm.props";

const readDocs = api.validation.participants.allowedActions.READ_DOCS;
const uploadDocs = api.validation.participants.allowedActions.UPLOAD_DOCS;

/**
 * Component that renders the chat permissions section for chat participants.
 * It asks for the chat permissions to be assigned to the participant with switches.
 */
const PermissionsParticipantsForm = ({
    assignedPermissions,
    onChangePermission,
}) => {
    const readFiles = (
        <ListItem>
            <ListItemText
                primary={
                    messages.chats.participants.formSections.permissions
                        .READ_DOCS_LABEL
                }
                secondary={
                    messages.chats.participants.formSections.permissions
                        .READ_DOCS_DESC
                }
                id="read_files_permission"
            />
            <Switch
                edge="end"
                inputProps={{
                    "aria-labelledby": "read_files_permission",
                }}
                name={readDocs}
                onChange={onChangePermission}
                checked={assignedPermissions[readDocs]}
            />
        </ListItem>
    );

    const uploadFiles = (
        <ListItem>
            <ListItemText
                primary={
                    messages.chats.participants.formSections.permissions
                        .UPLOAD_DOCS_LABEL
                }
                secondary={
                    messages.chats.participants.formSections.permissions
                        .UPLOAD_DOCS_DESC
                }
                id="upload_files_permission"
            />
            <Switch
                edge="end"
                inputProps={{
                    "aria-labelledby": "upload_files_permission",
                }}
                name={uploadDocs}
                onChange={onChangePermission}
                checked={assignedPermissions[uploadDocs]}
            />
        </ListItem>
    );

    return (
        <List>
            {readFiles}
            {uploadFiles}
        </List>
    );
};

PermissionsParticipantsForm.propTypes = propTypes;

export default PermissionsParticipantsForm;
