import { useEffect, useState } from "react";
import { GetPresences } from "../api/PresenceApi";
import { AppLayout } from "../layouts/AppLayout";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";

export const Presence = () => {
    const [presence, setPresence] = useState([]);
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPresence = async () => {
            setLoading(true);
            setErrors(null);
            try {
                const response = await GetPresences();
                const data = response?.presences;

                if (Array.isArray(data) && data.length > 0) {
                    const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
                    setPresence(sortedData);
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

    const getStatusColor = (status) => {
        switch (status) {
            case "validated":
                return "text-green-600 bg-green-100";
            case "pending":
                return "text-yellow-600 bg-yellow-100";
            case "rejected":
                return "text-red-600 bg-red-100";
            default:
                return "text-gray-600 bg-gray-100";
        }
    };

    console.log(presence)

    return (
        <AppLayout>
            <div className="max-w-5xl mx-auto px-6 py-10 mt-10">
                <h1 className="text-3xl font-bold text-indigo-700 mb-6 flex items-center">
                    <ClipboardDocumentListIcon className="h-8 w-8 mr-2" />
                    Riwayat Presensi Lengkap
                </h1>

                {loading ? (
                    <p className="text-sm text-gray-500">Memuat data presensi...</p>
                ) : errors ? (
                    <p className="text-sm text-red-500">{errors}</p>
                ) : presence.length === 0 ? (
                    <p className="text-sm text-gray-500">Belum ada data presensi yang tersedia.</p>
                ) : (
                    <ul className="grid md:grid-cols-2 gap-6">
                        {presence.map((item) => (
                            <li
                                key={item.id}
                                className="border border-gray-200 rounded-xl p-4 shadow hover:shadow-lg transition-all bg-white"
                            >
                                {/* Gambar Presensi */}
                                {item.image && (
                                    <div className="mb-3">
                                        <img
                                            src={item.image}
                                            alt="Foto Presensi"
                                            className="w-full h-52 object-cover rounded-lg border"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "/no-image.png"; // fallback image jika URL gagal dimuat
                                            }}
                                        />
                                    </div>
                                )}


                                <div className="flex justify-between items-center mb-1">
                                    <p className="font-semibold text-gray-800">Lab: {item.lab}</p>
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                                        {item.status}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 italic mb-1">"{item.note || 'Tidak ada catatan'}"</p>
                                <p className="text-xs text-gray-400">
                                    Tanggal: {item.updated_at ? item.updated_at : "Tidak diketahui"}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </AppLayout>
    );
};
