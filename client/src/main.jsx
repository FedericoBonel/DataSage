import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { ThemeProvider } from "@/lib/mui";
import { QueryClientProvider } from "@/lib/react-query";
import { WorkerProvider } from "@/lib/react-pdf-viewer";
import { AuthProvider } from "@/contexts/auth";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <QueryClientProvider>
            <ThemeProvider>
                <AuthProvider>
                    <WorkerProvider>
                        <App />
                    </WorkerProvider>
                </AuthProvider>
            </ThemeProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
