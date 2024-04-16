import { Box, Drawer, Divider, Avatar } from "@mui/material";
import { Chat } from "@mui/icons-material";
import { routes, messages } from "@/utils/constants";
import logo from "@/assets/logo.svg";
import NavbarLink from "../NavbarLink/NavbarLink";
import NavbarLinks from "../NavbarLinks/NavbarLinks";
import proptypes from "./Navbar.proptypes";
import {
    NavbarDrawerStyles,
    NavbarDrawerListMenusStyles,
} from "./Navbar.styles";

/** Component that renders the top level navbar in the website. */
const Navbar = ({ selectedMenu }) => {
    return (
        <Drawer sx={NavbarDrawerStyles} variant="permanent" anchor="left">
            <Box
                component={"img"}
                src={logo}
                alt={messages.NAVBAR_LOGO_ALT}
                loading="lazy"
                padding={1}
            />
            <NavbarLinks>
                <NavbarLink
                    selected={selectedMenu === routes.chats.CHATS}
                    icon={<Chat fontSize="inherit" />}
                    label={messages.navbar.CHATS_OPTION}
                />
            </NavbarLinks>
            <Divider />
            <NavbarLinks sx={NavbarDrawerListMenusStyles}>
                <NavbarLink
                    icon={<Avatar />}
                    label={messages.navbar.SETTINGS_OPTION}
                />
            </NavbarLinks>
        </Drawer>
    );
};

Navbar.propTypes = proptypes;

export default Navbar;
