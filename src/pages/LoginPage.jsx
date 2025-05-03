import { Link, useNavigate } from 'react-router-dom';
import bgLogin from '../assets/images/bgLogin.jpg';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { LoaderSquare } from '../components/Loader';

export const LoginPage = () => {
    const [userInput, setUserInput] = useState('')
    const [password, setPassword] = useState('')
    const [deviceName, setDeviceName] = useState('')
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const { Login, user } = useAuth()
    const navigate = useNavigate();


    const deviceInfo = () => {
        const userAgent = navigator.userAgent
        setDeviceName(userAgent)
        return userAgent
    }
    useEffect(() => {
        deviceInfo()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await Login(userInput, password, deviceName)
            if (response.status = 200) {
                navigate('/dashboard')
            }
        } catch (err) {
            console.log(err)
            setErrors(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${bgLogin})` }}
        >
            <div className="bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Selamat Datang 👋
                </h2>
                <h3 className="text-md text-gray-800 mb-6 text-center">
                    Hai, silahkan login terlebih dahulu untuk bisa masuk ke dalam sistem
                </h3>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Username / Email
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/70 backdrop-blur-sm"
                            placeholder="Masukkan username atau email"
                            onChange={(e) => { setUserInput(e.target.value) }}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/70 backdrop-blur-sm"
                            placeholder="Masukkan password"
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                    </div>
                    {loading ? <LoaderSquare /> : ""}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition duration-300 cursor-pointer"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-6 text-sm text-center text-gray-700">
                    Belum punya akun?{' '}
                    <Link to="/register" className="text-blue-700 hover:underline">
                        Daftar di sini
                    </Link>
                </p>
            </div>
        </div>
    );
};
