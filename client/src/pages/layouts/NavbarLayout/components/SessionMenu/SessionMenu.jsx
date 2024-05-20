import { Avatar } from "@mui/material";
import AccountLink from "@/features/accounts/AccountLink";
import LogoutButton from "@/features/auth/LogoutButton";
import Menu from "@/components/actions/Menu";
import { messages } from "@/utils/constants";

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
            {/* Account settings link */}
            <AccountLink />
            {/* Logout button */}
            <LogoutButton />
        </Menu>
    );
};

export default SessionMenu;
