import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL

export const RegisterUser = async (data) => {
    console.log(data)

    try {
        const response = await axios.post(`${API_URL}user`, data)
        return response.data
    } catch (error) {
        throw error.response?.data || { message: 'Gagal Membuat Akun' };
    }
}

export const UpdateUser = async (data, id) => {
    const token = localStorage.getItem('token');

    // data.forEach((value, key) => {
    //     console.log(`${key}:`, value);
    // });

    const header = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
        }
    }

    try {
        const response = await axios.post(`${API_URL}user/${id}`, data, header)
        return(response.data)
    } catch (error) {
        throw error.response?.data || { message: 'Gagal mengupdate Akun' };
    }
}