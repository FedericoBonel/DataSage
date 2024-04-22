import { Outlet, useMatch } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";

/** The layout that provides a navbar with the main options of navigation. */
const NavbarLayout = () => {
    // Get the selected route from url
    const match = useMatch("/:selectedMenu/*");
    const selectedMenu = match?.params?.selectedMenu;
    
    return (
        <Box sx={{ display: "flex" }}>
            <Navbar selectedMenu={selectedMenu} />
            <Box sx={{ flexGrow: 1 }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default NavbarLayout;
