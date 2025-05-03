import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Lucide untuk icon
import defaultProfile from '../assets/images/defaultProfile.jpg'; // Ganti dengan path foto default
import { useAuth } from '../context/AuthContext';
import { LoaderPuff } from './Loader';

export const Navbar = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const { Logout } = useAuth();
    const navigate = useNavigate()

    const handleClick = async () => {
        console.log('click')
        try {
            setLoading(true)
            await Logout()
            navigate('/login')
        } catch (err) {
            console.log(err)
            setErrors(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <nav className="bg-white shadow-md px-4 py-3 md:px-8 fixed w-full z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Kiri: Profile */}
                <div className="flex items-center space-x-4">
                    <img
                        src={user?.image || defaultProfile}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover border border-gray-300"
                    />
                    <span className="font-semibold text-gray-800 sm:inline">
                        {user?.name || 'Pengguna'}
                    </span>
                </div>

                {/* Kanan: Menu Desktop */}
                <div className="hidden md:flex space-x-6 items-center">
                    <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition">Dashboard</Link>
                    <Link to="/profile" className="text-gray-700 hover:text-blue-600 transition">Account</Link>
                    <Link to="/presence" className="text-gray-700 hover:text-blue-600 transition">Presensi</Link>
                    {user?.role === 'admin' && (
                        <Link to="/members" className="text-gray-700 hover:text-blue-600 transition">Data Anggota</Link>
                    )}
                    {user?.role === 'admin' && (
                        <Link to="/recap-honor" className="text-gray-700 hover:text-blue-600 transition">Rekap Honor</Link>
                    )}
                    <button className="text-gray-700 hover:text-red-600 transition" onClick={handleClick}>Logout</button>
                    {loading ? <LoaderPuff /> : ""}
                    {errors && <p className="text-red-600 mt-2 text-sm">{errors}</p>}
                </div>

                {/* Kanan: Menu Mobile Toggle */}
                <div className="md:hidden">
                    <button onClick={toggleMenu}>
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Dropdown menu mobile */}
            {isOpen && (
                <div className="md:hidden mt-3 space-y-2 px-4">
                    <Link to="/dashboard" className="block text-gray-700 hover:text-blue-600 transition">Dashboard</Link>
                    <Link to="/profile" className="block text-gray-700 hover:text-blue-600 transition">Account</Link>
                    <Link to="/presence" className="block text-gray-700 hover:text-blue-600 transition">Presensi</Link>
                    {user?.role === 'admin' && (
                        <Link to="/members" className="block text-gray-700 hover:text-blue-600 transition">Data Anggota</Link>
                    )}
                    {user?.role === 'admin' && (
                        <Link to="/recap-honor" className="block text-gray-700 hover:text-blue-600 transition">Rekap Honor</Link>
                    )}
                    <button className="block text-gray-700 hover:text-red-600 transition" onClick={handleClick}>Logout</button>
                    {loading ? <LoaderPuff /> : ""}
                    {errors && <p className="text-red-600 mt-2 text-sm">{errors}</p>}
                </div>
            )}
        </nav>
    );
};
