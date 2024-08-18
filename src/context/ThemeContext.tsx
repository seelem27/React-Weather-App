import React, { createContext, ReactNode, useEffect, useState } from "react";
import { THEME_KEY } from "../constants/constant";

//define theme context type
interface ThemeContextType {
    darkTheme: boolean;
    setDarkTheme: (theme: boolean) => void;
    saveThemeToLocalStorage: (theme: boolean) => void;
}

interface ThemeProviderProps {
    children: ReactNode;
}

//create ThemeContext with default value
const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
    const [darkTheme, setDarkTheme] = useState<boolean>(true);

    // function save theme data to localStorage
    const saveThemeToLocalStorage = (theme: boolean) => {
        localStorage.setItem(THEME_KEY, theme.toString());
    }

    useEffect(() => {
        // Retrieve the saved theme preference from localStorage
        const savedTheme = localStorage.getItem(THEME_KEY);
        if (savedTheme !== null) {
            setDarkTheme(savedTheme === 'true');
            return;
        }

        //set theme base on user's machine theme color
        const isSystemThemeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkTheme(isSystemThemeDark === true);
    }, []); // run only once

    return (
        <ThemeContext.Provider value={{ darkTheme, setDarkTheme, saveThemeToLocalStorage }}>
            {children}
        </ThemeContext.Provider>
    )
};

export { ThemeProvider };
export default ThemeContext;