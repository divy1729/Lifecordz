import React, { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    const API_BASE = process.env.REACT_APP_API_URL?.replace(/\/$/, "");

    const login = useCallback(async (email, password) => {
        try {
            console.log('Sending login request with:', { email, password });
    
            const response = await fetch(`${API_BASE}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
            console.log('Login response:', data);
    
            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }
    
            setUser(data.user);
            setToken(data.token);
            localStorage.setItem('token', data.token);
    
            // ✅ Store user role
            if (data.user && data.user.role) {
                localStorage.setItem('role', data.user.role); // Save role for redirection
            }
    
            return data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }, [API_BASE]);
    

    const register = useCallback(async (userData) => {
        try {
            const response = await fetch(`${API_BASE}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            return await response.json();
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }, [API_BASE]);

    const logout = useCallback(() => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
    }, []);

    const verifyOtp = useCallback(async (email, otp) => {
        try {
            const response = await fetch(`${API_BASE}/auth/verify-otp?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`, {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('OTP verification failed');
            }

            return await response.json();
        } catch (error) {
            console.error('OTP verification error:', error);
            throw error;
        }
    }, [API_BASE]);

    // Add a getToken function to centralize token retrieval
    const getToken = () => {
        return localStorage.getItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, verifyOtp, getToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};