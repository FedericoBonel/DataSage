import { Link } from "react-router-dom";
import {
    Avatar,
    ListItemIcon,
    MenuItem,
    ListItem,
    ListItemText,
} from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";
import LogoutButton from "@/features/auth/LogoutButton";
import Menu from "@/components/actions/Menu";
import { messages, routes } from "@/utils/constants";

/** Renders the component that shows the pop over menu to manage the user session (Check who is logged in, log out, etc.) */
const SessionMenu = () => {
    return (
        <Menu
            variant="iconButton"
            icon={<Avatar />}
            label={messages.navbar.SETTINGS_OPTION}
            position={{ vertical: "bottom", horizontal: "right" }}
            keepMounted
        >
            {/* TODO Implement this as a feature */}
            <MenuItem
                disableGutters
                divider
                component={Link}
                to={`/${routes.auth.ACCOUNT}/${routes.SETTINGS}`}
            >
                <ListItem component="div" secondaryAction={<ArrowForwardIos />}>
                    <ListItemIcon>
                        <Avatar sx={{ marginRight: 2 }} />
                    </ListItemIcon>
                    <ListItemText
                        secondaryTypographyProps={{ noWrap: true }}
                        primary={"John Doe"}
                        secondary={"john.doe@example.com"}
                    />
                </ListItem>
            </MenuItem>
            <LogoutButton />
        </Menu>
    );
};

export default SessionMenu;
