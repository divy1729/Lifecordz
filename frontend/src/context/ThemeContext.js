import React, { createContext, useContext, useState, useEffect } from 'react';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode ? JSON.parse(savedMode) : false;
    });

    const getDesignTokens = (mode) => ({
        palette: {
            mode,
            ...(mode === 'dark' ? {
                text: {
                    primary: '#fff',
                    secondary: 'rgba(255, 255, 255, 0.7)',
                },
                background: {
                    default: '#121212',
                    paper: '#1E1E1E',
                },
            } : {
                // Light mode colors remain the same
            }),
        },
        typography: {
            h4: {
                fontWeight: 600,
                marginBottom: '1rem'
            },
            h6: {
                fontWeight: 600,
                color: 'primary.main'
            }
        },
        components: {
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundImage: 'none'
                    }
                }
            }
        }
    });

    const theme = createTheme(getDesignTokens(darkMode ? 'dark' : 'light'));

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            <MUIThemeProvider theme={theme}>
                {children}
            </MUIThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext); 