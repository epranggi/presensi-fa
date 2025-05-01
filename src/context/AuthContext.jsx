import React, { createContext, useState, useContext, useEffect } from 'react';
import { LoginRequest, LogoutRequest, validateToken } from '../api/AuthApi';

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem('token')
            if (token) {
                const userData = await validateToken(token)
                setUser(userData)
            }
        } catch (err) {
            console.error('Token validation failed:', err);
            localStorage.removeItem('token');
        }
    }

    useEffect(() => {
        checkAuth()
    }, [])


    const Login = async (user_input, password, device_name) => {
        try {
            const response = await LoginRequest(user_input, password, device_name)
            console.log(response.user)
            setUser(response.user)
            return response.user
        } catch (err) {
            throw err.message || { message: 'Login gagal' };
        }
    }

    const Logout = async () => {
        try {
            await LogoutRequest()
            localStorage.removeItem('token');
            setUser(null)
        } catch (err) {
            throw err.message || { message: 'Logout gagal' };
        }
    }

    return (
        <>
            <AuthContext.Provider value={{ user, Login, Logout }}>
                {children}
            </AuthContext.Provider>
        </>
    )
}

export const useAuth = () => useContext(AuthContext);