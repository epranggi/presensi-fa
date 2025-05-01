import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL

export const GetPresences = async () => {
    const token = localStorage.getItem('token');
    const header = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Accept': 'application/json'
        }
    }

    try {
        const response = await axios.get(`${API_URL}presence`, header)
        return response.data
    } catch (error) {
        throw error.response?.data || { message: 'Gagal menagmbil data presensi' };
    }
}