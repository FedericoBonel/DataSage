import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import { Button, Typography, Container, Box, Link } from "@mui/material";

/** Application provider, it routes all client side requests to diferent pages. */
const router = createBrowserRouter([
    {
        path: "/*",
        element: <SampleViteHome />,
        children: [],
    },
]);

function SampleViteHome() {
    const [count, setCount] = useState(0);

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}
        >
            <Box display={"flex"} gap={2}>
                <Link href="https://vitejs.dev" target="_blank">
                    <Box
                        component={"img"}
                        height={"6em"}
                        src={viteLogo}
                        className="logo"
                        alt="Vite logo"
                    />
                </Link>
                <Link href="https://react.dev" target="_blank">
                    <Box
                        component={"img"}
                        height={"6em"}
                        src={reactLogo}
                        className="logo react"
                        alt="React logo"
                    />
                </Link>
            </Box>
            <Typography variant="h2">Vite + React</Typography>
            <Box
                className="card"
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
            >
                <Button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </Button>
                <Typography>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </Typography>
            </Box>
            <Typography variant="caption">
                Click on the Vite and React logos to learn more
            </Typography>
        </Container>
    );
}

const App = () => <RouterProvider router={router} />;

export default App;
