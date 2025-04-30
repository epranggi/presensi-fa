import React, { createContext, useState, useContext } from 'react';
import { LoginRequest, LogoutRequest } from '../api/AuthApi';

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)

    const Login = async (user_input, password, device_name) => {
        const response = await LoginRequest(user_input, password, device_name)
        console.log(response.user)
        setUser(response.user)
        return response.user
    }

    const Logout = async () => {
        await LogoutRequest()
        setUser(null)
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