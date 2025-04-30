import axios from 'axios';
const API_URL = import.meta.env.VITE_API_AUTH_URL

export const Login = async (user_input, password, device_name) => {
    const data = {
        "user_input": user_input,
        "password": password,
        "device_name": device_name,
    }

    try {
        const response = await axios.post(`${API_URL}login`, data)
        return response.data
    } catch (error) {
        throw error.response?.data || { message: 'Login gagal' };
    }
}

export const Logout = async () => {
    const token = localStorage.getItem('token')
    const data = {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }

    try {
        const response = await axios.get(`${API_URL}logout`, data)
        return response.data
    } catch (error) {
        throw error.response?.data || { message: 'Logout gagal' };
    }
}