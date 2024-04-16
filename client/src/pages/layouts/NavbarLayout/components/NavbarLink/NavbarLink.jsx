import { Link } from "react-router-dom";
import { ListItem, IconButton, Typography } from "@mui/material";
import { NavbarLinkStyles } from "./NavbarLink.styles";
import proptypes from "./NavbarLink.proptypes";

/** Component of a navbar link that navigates to a main page */
const NavbarLink = ({ selected, icon, label, href }) => {
    return (
        <ListItem sx={NavbarLinkStyles}>
            <IconButton
                aria-label={label}
                size="large"
                href={href}
                LinkComponent={href ? Link : undefined}
                color={selected ? "primary" : "inherit"}
            >
                {icon}
            </IconButton>
            <Typography variant="caption">{label}</Typography>
        </ListItem>
    );
};

NavbarLink.propTypes = proptypes;

export default NavbarLink;
