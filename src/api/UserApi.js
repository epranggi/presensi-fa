import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL

export const RegisterUser = async (form) => {
    console.log(form)

    try {
        const response = await axios.post(`${API_URL}user`, form)
        return response.data
    } catch (error) {
        throw error.response?.data || { message: 'Gagal Membuat Akun' };
    }
}