import axios from 'axios';
const API_AUTH_URL = import.meta.env.VITE_API_AUTH_URL
const API_URL = import.meta.env.VITE_API_URL
const SANCTUM_URL = import.meta.env.VITE_BASE_URL

export const LoginRequest = async (user_input, password, device_name) => {
    const data = {
        "user_input": user_input,
        "password": password,
        "device_name": device_name,
    }

    try {
        // 1. Ambil CSRF token terlebih dahulu
        await axios.get(`${SANCTUM_URL}sanctum/csrf-cookie`);

        // 2. Kirim request login
        const response = await axios.post(`${API_AUTH_URL}login`, data)
        return response.data

    } catch (error) {
        throw error.response?.data || { message: 'Login gagal' };
    }
}

export const LogoutRequest = async () => {

    try {
        const response = await axios.post(`${API_URL}logout`, data)
        return response.data
    } catch (error) {
        throw error.response?.data || { message: 'Logout gagal' };
    }

}