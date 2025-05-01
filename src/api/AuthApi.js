import axios from 'axios';
const API_AUTH_URL = import.meta.env.VITE_API_AUTH_URL
const API_URL = import.meta.env.VITE_API_URL

export const LoginRequest = async (user_input, password, device_name) => {
    const data = {
        "user_input": user_input,
        "password": password,
        "device_name": device_name,
    }

    try {
        const response = await axios.post(`${API_AUTH_URL}login`, data)

        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        console.log(response.data.token)
        return response.data
    } catch (error) {
        throw error.response?.data || { message: 'Login gagal' };
    }
}

export const LogoutRequest = async () => {
    const token = localStorage.getItem('token');
    const data = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {
        const response = await axios.post(`${API_AUTH_URL}logout`, {}, data)
        return response.data
    } catch (error) {
        throw error.response?.data || { message: 'Logout gagal' };
    }
}

export const validateToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const response = await axios.get(`${API_URL}user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Logout gagal' };
    }
};
