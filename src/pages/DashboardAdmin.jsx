import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClipboardDocumentListIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import { AppLayoutAdmin } from "../layouts/AppLayoutAdmin";
import { GetPresences } from "../api/PresenceApi";

export const DashboardAdmin = () => {
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

    const totalPending = presence.filter(p => p.status === "pending").length;

    return (
        <AppLayoutAdmin>
            <div className="max-w-4xl mx-auto px-6 py-10 mt-10 sm:mt-8">
                <h1 className="text-3xl font-bold text-indigo-700 mb-2">
                    Dashboard Admin 👨‍💼
                </h1>
                <p className="text-gray-600 mb-6">
                    Selamat datang di dashboard admin! Gunakan halaman ini untuk mengelola dan memvalidasi presensi anggota.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    {/* Kartu Total Pending Presensi */}
                    <div className="bg-white border border-gray-100 rounded-2xl shadow-md p-6 flex items-center space-x-4">
                        <CalendarDaysIcon className="h-10 w-10 text-indigo-600" />
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">Total Presensi Belum Divalidasi</h2>
                            <p className="text-indigo-600 text-3xl font-bold">{totalPending}</p>
                            <p className="text-sm text-gray-500">Jumlah presensi yang menunggu validasi</p>
                        </div>
                    </div>

                    {/* Kartu Riwayat Presensi */}
                    <div className="bg-white border border-gray-100 rounded-2xl shadow-md p-6">
                        <div className="flex items-center space-x-2 mb-4">
                            <ClipboardDocumentListIcon className="h-6 w-6 text-indigo-600" />
                            <div className="flex flex-col items-start">
                                <h2 className="text-xl font-semibold text-gray-800">Presensi Belum Divalidasi</h2>
                                <Link to='/presence-admin' className="text-sm font-semibold text-gray-400 underline">Lihat semua presensi</Link>
                            </div>
                        </div>
                        {loading ? (
                            <p className="text-sm text-gray-500">Memuat data presensi...</p>
                        ) : errors ? (
                            <p className="text-sm text-red-500">{errors}</p>
                        ) : (
                            <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
                                {presence
                                    .filter(item => item.status === "pending")
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

                {/* Tombol Akses Halaman Validasi */}
                <div className="flex justify-center">
                    <Link to="/presence-admin">
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all">
                            Validasi Presensi Anggota
                        </button>
                    </Link>
                </div>
            </div>
        </AppLayoutAdmin>
    );
};
