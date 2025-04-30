import { useState } from 'react';
import { Link } from 'react-router-dom';
import bgLogin from '../assets/images/bgLogin.jpg';
import { RegisterUser } from '../api/UserApi';
import { LoaderSquare } from '../components/Loader';

export const RegisterPage = () => {
    const [form, setForm] = useState({
        name: '',
        nim: '',
        class: '',
        phone: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [image, setImage] = useState(null)
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);


    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setForm({ ...form, [name]: files ? files[0] : value });
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const validate = () => {
        let err = {};

        if (!form.name) err.name = 'Nama wajib diisi';
        if (!form.nim) err.nim = 'NIM wajib diisi';

        if (!form.class) err.class = 'Kelas wajib diisi';

        if (!form.phone) err.phone = 'Nomor telepon wajib diisi';
        else if (!/^\d{1,15}$/.test(form.phone)) err.phone = 'Nomor maksimal 15 angka';

        if (!form.username) err.username = 'Username wajib diisi';

        if (!form.email) err.email = 'Email wajib diisi';
        else if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = 'Format email tidak valid';

        if (!form.password) err.password = 'Password wajib diisi';
        if (form.password !== form.confirmPassword) err.confirmPassword = 'Password tidak cocok';

        if (image && !['image/jpeg', 'image/png', 'image/jpg'].includes(image.type)) {
            err.image = 'Foto harus berupa jpeg, png, atau jpg';
        } else if (image && image.size > 2 * 1024 * 1024) {
            err.image = 'Ukuran maksimal 2MB';
        }

        setErrors(err);
        return Object.keys(err).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        for (let key in form) {
            data.append(key, form[key]);
        }

        if (image) {
            data.append('image', image);
        }

        if (validate()) {
            try {
                setLoading(true)
                const response = await RegisterUser(data);
                setIsSuccess(true);
                return response
            } catch (err) {
                const newErrors = {};

                // Telusuri setiap key di error
                if (err?.errors) {
                    for (const key in err.errors) {
                        const messages = err.errors[key];
                        if (Array.isArray(messages) && messages.includes('validation.unique')) {
                            newErrors[key] = 'Data sudah digunakan';
                            newErrors[key] = messages[0]; // ambil pesan pertama (fallback)
                        } else {
                        }
                    }
                }

                setErrors(newErrors);
            } finally {
                setLoading(false)
            }
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${bgLogin})` }}
        >
            {isSuccess && (
                <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex justify-center items-center z-50 px-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg text-center">
                        <h2 className="text-xl font-bold text-green-600 mb-4">Akun berhasil dibuat!</h2>
                        <p className="mb-6">Silakan login untuk melanjutkan.</p>
                        <Link to="/login">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl">
                                Ke Halaman Login
                            </button>
                        </Link>
                    </div>
                </div>
            )}

            <div className="bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Buat Akun</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Foto Profil */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Foto Profil
                        </label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-white file:bg-blue-600 hover:file:bg-blue-700"
                        />
                        {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
                    </div>

                    {/* Nama, NIM, Kelas */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <input
                                type="text"
                                name="name"
                                placeholder="Nama"
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white/70 backdrop-blur-sm"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>
                        <div>
                            <input
                                type="text"
                                name="nim"
                                placeholder="NIM"
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white/70 backdrop-blur-sm"
                            />
                            {errors.nim && <p className="text-red-500 text-sm">{errors.nim}</p>}
                        </div>
                        <div>
                            <input
                                type="text"
                                name="class"
                                placeholder="Kelas"
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white/70 backdrop-blur-sm"
                            />
                            {errors.class && <p className="text-red-500 text-sm">{errors.class}</p>}
                        </div>
                    </div>

                    {/* Telepon */}
                    <div>
                        <input
                            type="text"
                            name="phone"
                            placeholder="Nomor Telepon"
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white/70 backdrop-blur-sm"
                        />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                    </div>

                    {/* Username */}
                    <div>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white/70 backdrop-blur-sm"
                        />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white/70 backdrop-blur-sm"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    {/* Password */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white/70 backdrop-blur-sm"
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>
                        <div>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Konfirmasi Password"
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white/70 backdrop-blur-sm"
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                        </div>
                    </div>
                    {loading ? <LoaderSquare /> : ""}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition duration-300"
                    >
                        Register
                    </button>

                    <p className="mt-4 text-sm text-center text-gray-700">
                        Sudah punya akun?{' '}
                        <Link to="/login" className="text-blue-700 hover:underline">
                            Login di sini
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};
