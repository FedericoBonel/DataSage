import { Outlet, useMatch } from "react-router-dom";
import { Box } from "@mui/material";
import NavbarNotificationLink from "@/features/notifications/NavbarNotificationLink";
import { routes } from "@/utils/constants";
import Navbar from "./components/Navbar/Navbar";
import SessionMenu from "./components/SessionMenu"
import {
    PageContainerStyles,
    ContentContainerStyle,
} from "./NavbarLayout.styles";

/** The layout that provides a navbar with the main options of navigation. */
const NavbarLayout = () => {
    // Get the selected route from url
    const match = useMatch("/:selectedMenu/*");
    const selectedMenu = match?.params?.selectedMenu;

    return (
        <Box sx={PageContainerStyles}>
            {/* Navbar content with all regular links */}
            <Navbar selectedMenu={selectedMenu}>
                {/* Notification link is a feature that gets the non read counter from api */}
                <NavbarNotificationLink
                    selected={
                        selectedMenu === routes.notifications.NOTIFICATIONS
                    }
                />
                <SessionMenu />
            </Navbar>
            {/* Page content */}
            <Box sx={ContentContainerStyle}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default NavbarLayout;
