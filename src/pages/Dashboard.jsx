import { useAuth } from "../context/AuthContext";
import { AppLayout } from "../layouts/AppLayout";
import { Link } from "react-router-dom";
import { CalendarDaysIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { GetPresences } from "../api/PresenceApi";

export const Dashboard = () => {
    const { user } = useAuth();
    const [presence, setPresence] = useState([]);
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPresence = async () => {
            setLoading(true);
            setErrors(null); // reset error
            try {
                const response = await GetPresences();
                console.log(response);

                const data = response?.presences;

                if (Array.isArray(data) && data.length > 0) {
                    setPresence(data);
                } else {
                    setPresence([]);
                    setErrors("Data presensi kosong.");
                }
            } catch (err) {
                console.log(err);
                setErrors("Gagal memuat data dari server.");
            } finally {
                setLoading(false);
            }
        };

        fetchPresence();
    }, []);

    const pendingPresence = presence.filter(item => item.status === "pending")
    const totalValidated = presence.filter(p => p.status === "validated").length;
    const totalPending = presence.filter(p => p.status === "pending").length;


    return (
        <AppLayout>
            <div className={`max-w-4xl mx-auto px-6 py-10 mt-10 sm:mt-8`}>
                <h1 className="text-3xl font-bold text-indigo-700 mb-2">
                    Hai, {user?.name || "User"} 👋
                </h1>
                <p className="text-gray-600 mb-6">
                    {`${user?.role === 'member' ? 'Selamat datang di sistem presensi Forum Asisten! Gunakan halaman ini untuk memantau kehadiranmu selama semester ini.'
                        : 'Selamat datang di dashboard admin! Gunakan halaman ini untuk mengelola dan memvalidasi presensi anggota.'}`}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    {/* Kartu Total Presensi */}
                    <div className="bg-white border border-gray-100 rounded-2xl shadow-md p-6 flex items-center space-x-4">
                        <CalendarDaysIcon className="h-10 w-10 text-indigo-600" />
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">{`${user?.role === 'member' ? 'Total presensi tervalidasi' : 'Total presensi belum validasi'}`}</h2>
                            <p className="text-indigo-600 text-3xl font-bold">{totalValidated}</p>
                            <p className="text-sm text-gray-500"> {`${user?.role === 'member' ? 'Jumlah kehadiran yang tervalidasi' : 'Jumlah presensi yang menunggu validasi'}`}</p>
                        </div>
                    </div>

                    {/* Kartu Riwayat Presensi */}
                    <div className="bg-white border border-gray-100 rounded-2xl shadow-md p-6">
                        <div className="flex items-center space-x-2 mb-4">
                            <ClipboardDocumentListIcon className="h-6 w-6 text-indigo-600" />
                            <div className="flex flex-col items-start">
                                <h2 className="text-xl font-semibold text-gray-800"> {`${user?.role === 'member' ? 'Riwayat Presensi' : `Presensi belum tervalidasi`}`}</h2>
                                <Link to='/presence' className="text-sm font-semibold text-gray-400 underline">Lihat semua presensi</Link>
                            </div>
                        </div>
                        {loading ? (
                            <p className="text-sm text-gray-500">Memuat data presensi...</p>
                        ) : errors ? (
                            <p className="text-sm text-red-500">{errors}</p>
                        ) : (
                            <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
                                {(user?.role === 'member' ? presence : pendingPresence)
                                    .slice(0, 4)
                                    .map((item) => (
                                        <li key={item.id} className="py-2">
                                            <p className="font-medium text-gray-800">Lab: {item.lab}</p>
                                            <p className="text-sm text-gray-600">Status: <span className="capitalize">{item.status}</span></p>
                                            <p className="text-sm text-gray-500 italic">"{item.note}"</p>
                                        </li>
                                    ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Tombol Presensi */}
                <div className="flex justify-center">
                    <Link to={`${user?.role === 'member' && user?.status === 'active' ? '/presence/add' : '/presence'}`} className={`${user?.status === 'inactive' ? 'hidden' : 'block'}`}>
                        <button className='bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all'>
                            {`${user?.role === 'member' ? '+ Lakukan Presensi Sekarang' : `Lakukan Validasi Sekarang`}`}
                        </button>
                    </Link>
                    <div className={`${user?.status === 'inactive' ? 'block' : 'hidden'} bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-6`}>
                        <div className="flex items-center">
                            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-8 3a1 1 0 100-2 1 1 0 000 2zm-.75-7.75a.75.75 0 011.5 0v4a.75.75 0 01-1.5 0v-4z" clipRule="evenodd" />
                            </svg>
                            <span className="flex flex-col">
                                <p>Akun yang anda miliki tidak aktif</p>
                                <p>Silahkan hubungi admin untuk aktivasi akun</p>
                            </span>
                        </div>
                    </div>
                </div>
            </div>


        </AppLayout>
    );
};
