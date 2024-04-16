import { List } from "@mui/material";
import { NavbarLinksStyles } from "./NavbarLinks.styles";
import proptypes from "./NavbarLinks.proptypes"

/** Lists a set of navbar links or buttons */
const NavbarLinks = ({ sx = NavbarLinksStyles, children }) => {
    return <List sx={sx}>{children}</List>;
};

NavbarLinks.propTypes = proptypes;

export default NavbarLinks;
