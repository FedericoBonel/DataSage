import { Box, Drawer, Divider, Avatar } from "@mui/material";
import { Chat } from "@mui/icons-material";
import NavigationLink from "@/components/actions/NavigationLink";
import { routes, messages } from "@/utils/constants";
import logo from "@/assets/logo.svg";
import NavbarLinks from "../NavbarLinks/NavbarLinks";
import proptypes from "./Navbar.props";
import {
    NavbarDrawerStyles,
    NavbarDrawerListMenusStyles,
} from "./Navbar.styles";

/**
 * Component that renders the top level navbar in the website.
 * All the children will be shown at the bottom of the navbar or right side if horizontal.
 */
const Navbar = ({ selectedMenu, children }) => {
    return (
        <Drawer sx={NavbarDrawerStyles} variant="permanent" anchor="left">
            <Box
                component={"img"}
                src={logo}
                alt={messages.NAVBAR_LOGO_ALT}
                loading="lazy"
                padding={1}
            />
            <Divider />
            <NavbarLinks>
                <NavigationLink
                    selected={selectedMenu === routes.chats.CHATS}
                    icon={<Chat fontSize="inherit" />}
                    label={messages.navbar.CHATS_OPTION}
                    href={`/${routes.chats.CHATS}`}
                />
            </NavbarLinks>
            <Divider />
            <NavbarLinks sx={NavbarDrawerListMenusStyles}>
                {children}
                <NavigationLink
                    icon={<Avatar />}
                    label={messages.navbar.SETTINGS_OPTION}
                />
            </NavbarLinks>
        </Drawer>
    );
};

Navbar.propTypes = proptypes;

export default Navbar;
