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

    const totalValidated = presence.filter(p => p.status === "validated").length;

    return (
        <AppLayout>
            <div className="max-w-4xl mx-auto px-6 py-10 mt-10 sm:mt-8">
                <h1 className="text-3xl font-bold text-indigo-700 mb-2">
                    Hai, {user?.name || "User"} 👋
                </h1>
                <p className="text-gray-600 mb-6">
                    Selamat datang di sistem presensi Forum Asisten! Gunakan halaman ini untuk memantau kehadiranmu selama semester ini.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    {/* Kartu Total Presensi */}
                    <div className="bg-white border border-gray-100 rounded-2xl shadow-md p-6 flex items-center space-x-4">
                        <CalendarDaysIcon className="h-10 w-10 text-indigo-600" />
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">Total Presensi Tervalidasi</h2>
                            <p className="text-indigo-600 text-3xl font-bold">{totalValidated}</p>
                            <p className="text-sm text-gray-500">Jumlah kehadiran yang tervalidasi</p>
                        </div>
                    </div>


                    {/* Kartu Riwayat Presensi */}
                    <div className="bg-white border border-gray-100 rounded-2xl shadow-md p-6">
                        <div className="flex items-center space-x-2 mb-4">
                            <ClipboardDocumentListIcon className="h-6 w-6 text-indigo-600" />
                            <h2 className="text-xl font-semibold text-gray-800">Riwayat Presensi</h2>
                        </div>
                        {loading ? (
                            <p className="text-sm text-gray-500">Memuat data presensi...</p>
                        ) : errors ? (
                            <p className="text-sm text-red-500">{errors}</p>
                        ) : (
                            <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
                                {presence
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
                    <Link to="/presence/add">
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all">
                            + Lakukan Presensi Sekarang
                        </button>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
};
