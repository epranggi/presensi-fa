import { useEffect, useState } from "react";
import { DeletePresence, GetPresences } from "../api/PresenceApi";
import { AppLayout } from "../layouts/AppLayout";
import { ClipboardDocumentListIcon, TrashIcon } from "@heroicons/react/24/outline";
import { LoaderPuff } from "../components/Loader";

export const Presence = () => {
    const [presence, setPresence] = useState([]);
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [loadingDelete, setLoadingDelete] = useState(false)

    const [filteredPresence, setFilteredPresence] = useState([]);

    const [selectedLab, setSelectedLab] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");

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
                    setFilteredPresence(sortedData);
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

    useEffect(() => {
        const filtered = presence.filter(item => {
            const matchLab = selectedLab ? item.lab.toLowerCase() === selectedLab.toLowerCase() : true;
            const matchDate = selectedDate ? item.updated_at?.startsWith(selectedDate) : true;
            const matchStatus = selectedStatus ? item.status === selectedStatus : true;
            return matchLab && matchDate && matchStatus;
        });
        setFilteredPresence(filtered);
    }, [selectedLab, selectedDate, selectedStatus, presence]);

    const getStatusColor = (status) => {
        switch (status) {
            case "validated":
                return "text-green-600 bg-green-100";
            case "pending":
                return "text-yellow-600 bg-yellow-100";
            default:
                return "text-gray-600 bg-gray-100";
        }
    };

    const handleDelete = async () => {
        setLoadingDelete(true)
        try {
            await DeletePresence(selectedId);
            setPresence((prev) => prev.filter((p) => p.id !== selectedId));
            setShowModal(false);
            setSelectedId(null);
        } catch (err) {
            console.error(err);
            alert("Gagal menghapus presensi.");
        } finally {
            setLoadingDelete(false)
        }
    };

    return (
        <AppLayout>
            <div className="max-w-5xl mx-auto px-6 py-10 mt-10">
                <h1 className="text-3xl font-bold text-indigo-700 mb-6 flex items-center">
                    <ClipboardDocumentListIcon className="h-8 w-8 mr-2" />
                    Riwayat Presensi Lengkap
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {/* Filter Lab */}
                    <select
                        value={selectedLab}
                        onChange={(e) => setSelectedLab(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg"
                    >
                        <option value="">Semua Lab</option>
                        <option value="Lab 1">Lab 1</option>
                        <option value="Lab 2">Lab 2</option>
                        <option value="Lab 3">Lab 3</option>
                        <option value="Lab 4">Lab 4</option>
                        <option value="Lab 5">Lab 5</option>
                        <option value="Lab 6">Lab 6</option>
                    </select>

                    {/* Filter Tanggal */}
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg"
                    />

                    {/* Filter Status */}
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg"
                    >
                        <option value="">Semua Status</option>
                        <option value="validated">Tervalidasi</option>
                        <option value="pending">Belum Divalidasi</option>
                        <option value="rejected">Ditolak</option>
                    </select>
                </div>


                {loading ? (
                    <p className="text-sm text-gray-500">Memuat data presensi...</p>
                ) : errors ? (
                    <p className="text-sm text-red-500">{errors}</p>
                ) : filteredPresence.length === 0 ? (
                    <p className="text-sm text-gray-500">Belum ada data presensi yang tersedia.</p>
                ) : (
                    <ul className="grid md:grid-cols-2 gap-6">
                        {filteredPresence.map((item) => (
                            <li
                                key={item.id}
                                className="border border-gray-200 rounded-xl p-4 shadow hover:shadow-lg transition-all bg-white"
                            >
                                {item.image && (
                                    <div className="mb-3">
                                        <img
                                            src={item.image}
                                            alt="Foto Presensi"
                                            className="w-full h-52 object-cover rounded-lg border"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "/no-image.png";
                                            }}
                                        />
                                    </div>
                                )}

                                <div className="flex justify-between items-start mb-1">
                                    <div>
                                        <p className="font-semibold text-gray-800">Lab: {item.lab}</p>
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                                            {item.status}
                                        </span>
                                    </div>
                                    {/* Tombol Hapus hanya ditampilkan jika status = "pending" */}
                                    {item.status === "pending" && (
                                        <button
                                            onClick={() => {
                                                setSelectedId(item.id);
                                                setShowModal(true);
                                            }}
                                            className="text-red-500 hover:text-red-700 transition-colors"
                                            title="Hapus presensi"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    )}
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

            {/* Modal Konfirmasi */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-md max-w-sm w-full mx-6">
                        <h2 className="text-lg font-bold mb-4">Konfirmasi Hapus</h2>
                        <p className="text-sm text-gray-600 mb-6">
                            Apakah kamu yakin ingin menghapus data presensi ini? Tindakan ini tidak bisa dibatalkan.
                        </p>
                        {loadingDelete ? <LoaderPuff /> : ""}
                        <div className="flex justify-center space-x-3 mt-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
};
