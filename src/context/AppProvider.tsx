import React, { ReactNode } from "react";
import { ThemeProvider } from "./ThemeContext";
import { StateProvider } from "./StateContext";

interface StateProviderProps {
    children: ReactNode;
}

// combining ThemeProvider and StatProvider into one to export as AppProvider
const AppProvider: React.FC<StateProviderProps> = ({ children }) => {
    return (
        <ThemeProvider>
            <StateProvider>
                { children }
            </StateProvider>
        </ThemeProvider>
    );
}

export default AppProvider;