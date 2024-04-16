import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Typography, Container, Box } from "@mui/material";
import { ErrorRouter } from "@/routers";
import { ErrorHandler } from "@/routers/utils";
import { Public, Private } from "@/routers/layouts";
import { routes } from "@/utils/constants";

/** Application provider, it routes all client side requests to diferent pages. */
const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorHandler />,
        children: [
            /** Public routes */
            {
                element: <Public />,
                children: [{ path: routes.auth.LOGIN, element: <p>Login</p> }],
            },
            /** Private routes */
            {
                element: <Private />,
                children: [{ path: routes.HOME, element: <SampleViteHome /> }],
            },
            /** Common routes */
            { path: routes.error.ERROR, children: [ErrorRouter] },
        ],
    },
]);

function SampleViteHome() {
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
            <Typography variant="h2">Vite + React</Typography>
            <Box
                className="card"
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
            >
                <Typography>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </Typography>
            </Box>
        </Container>
    );
}

const App = () => <RouterProvider router={router} />;

export default App;
