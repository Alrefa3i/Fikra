import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const currentTheme = localStorage.getItem("theme");
        if (currentTheme) {
            document.querySelector("html").classList.add(currentTheme);
            document.querySelector("html").setAttribute("data-theme", currentTheme);
            setTheme(currentTheme);
        } else {
            document.querySelector("html").classList.add("light");
            document.querySelector("html").setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
            setTheme("light");
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        document.querySelector("html").classList.replace(theme, newTheme);
        document.querySelector("html").setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        setTheme(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    return useContext(ThemeContext);
};