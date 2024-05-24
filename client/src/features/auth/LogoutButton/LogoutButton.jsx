import { useNavigate } from "react-router-dom";
import {
    ListItemIcon,
    MenuItem,
    ListItem,
    ListItemText,
    CircularProgress,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import authServices from "@/services/auth";
import { messages, routes } from "@/utils/constants";

/** Renders the logout button that allows the user to log out from the system and remove all its credentials. */
const LogoutButton = () => {
    const navigate = useNavigate();
    const logoutQuery = authServices.useLogout();

    const onClick = () =>
        logoutQuery.mutate(undefined, {
            onSuccess: () =>
                navigate(`/${routes.auth.AUTH}/${routes.auth.LOGIN}`),
        });

    return (
        <MenuItem
            disabled={logoutQuery.isPending}
            disableGutters
            onClick={onClick}
        >
            <ListItem component="div">
                <ListItemIcon>
                    <Logout />
                </ListItemIcon>
                <ListItemText primary={messages.actions.decision.SIGNOUT} />
                {logoutQuery.isPending && <CircularProgress size="1rem" />}
            </ListItem>
        </MenuItem>
    );
};

export default LogoutButton;
