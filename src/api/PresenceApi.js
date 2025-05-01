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

export const AddPresence = async (data) => {
    const token = localStorage.getItem('token');
    const header = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Accept': 'application/json'
        }
    }

    try {
        const response = await axios.post(`${API_URL}presence`, data, header)
        return response
    } catch (error) {
        throw error.response?.data || { message: 'Gagal membuat data presensi' };
    }
}

export const DeletePresence = async (id) => {
    const token = localStorage.getItem('token');
    const header = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Accept': 'application/json'
        }
    }

    try {
        const response = await axios.delete(`${API_URL}presence/${id}`, header)
        return response
    } catch (error) {
        throw error.response?.data || { message: 'Gagal membuat data presensi' };
    }
} 

export const UpdatePresenceStatus = async (id, status) => {
    const token = localStorage.getItem('token');
    const header = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Accept': 'application/json'
        }
    }
    const data = {
        'status': status
    }
    console.log(data, id)
    try {
        const response = await axios.post(`${API_URL}update-presence-status/${id}`, data, header)
        return response
    } catch (error) {
        throw error.response?.data || { message: 'Gagal membuat data presensi' };
    }
}