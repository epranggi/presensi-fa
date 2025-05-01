import { useState } from "react";
import { AppLayout } from "../layouts/AppLayout";
import { CameraIcon, DocumentTextIcon, BuildingOfficeIcon } from "@heroicons/react/24/outline";
import { AddPresence } from "../api/PresenceApi";
import { Link } from "react-router-dom";

export const PresenceAdd = () => {
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [lab, setLab] = useState("");
    const [note, setNote] = useState("");
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false)

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(null);

        if (!image) {
            setErrors("Gambar wajib diunggah.");
            return;
        }

        const data = new FormData();
        if (image) {
            data.append('image', image);
        }
        if (lab) {
            data.append('lab', lab)
        }
        if (note) {
            data.append('note', note)
        }

        
        setLoading(true);
        try {
            const response = await AddPresence(data)
            if (response.status = 201) {
                setIsSuccess(true)
            }
            console.log(response)
            return response
        } catch (error) {
            console.log(error)
            setErrors(error)
        } finally {
            setLoading(false)
        }
    };

    return (
        <AppLayout>
            {isSuccess && (
                <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex justify-center items-center z-50 px-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg text-center">
                        <h2 className="text-xl font-bold text-green-600 mb-4">Presensi berhasil dibuat!</h2>
                        <Link to="/presence">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl">
                                Lihat presensi
                            </button>
                        </Link>
                    </div>
                </div>
            )}

            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 mt-14">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-indigo-700 mb-2">
                        Tambah Presensi
                    </h1>
                    <p className="text-gray-500 max-w-md mx-auto">
                        Lengkapi form berikut untuk mencatat kehadiran Anda
                    </p>
                </div>

                {errors && (
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-6 max-w-2xl mx-auto">
                        <div className="flex items-center">
                            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg space-y-6 mx-auto w-full max-w-2xl"
                >
                    {/* Upload Gambar */}
                    <div className="space-y-2">
                        <label className="block text-gray-700 font-medium flex items-center">
                            <CameraIcon className="h-5 w-5 mr-2 text-indigo-500" />
                            Foto Presensi <span className="text-red-500 ml-1">*</span>
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl">
                            <div className="space-y-1 text-center">
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="mx-auto h-48 w-full object-cover rounded-lg"
                                    />
                                ) : (
                                    <>
                                        <div className="flex justify-center">
                                            <svg
                                                className="mx-auto h-12 w-12 text-gray-400"
                                                stroke="currentColor"
                                                fill="none"
                                                viewBox="0 0 48 48"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>
                                        <div className="flex text-sm text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                                            >
                                                <span>Upload foto</span>
                                                <input
                                                    id="file-upload"
                                                    name="file-upload"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className="sr-only"
                                                />
                                            </label>
                                            <p className="pl-1">atau drag & drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            PNG, JPG, JPEG (Maks. 2MB)
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Pilih Lab */}
                    <div className="space-y-2">
                        <label className="block text-gray-700 font-medium flex items-center">
                            <BuildingOfficeIcon className="h-5 w-5 mr-2 text-indigo-500" />
                            Lab <span className="text-red-500 ml-1">*</span>
                        </label>
                        <select
                            value={lab}
                            onChange={(e) => setLab(e.target.value)}
                            required
                            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                            <option value="">Pilih Lab</option>
                            {Array.from({ length: 6 }).map((_, i) => (
                                <option key={i} value={`Lab ${i + 1}`}>
                                    Lab {i + 1}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Note */}
                    <div className="space-y-2">
                        <label className="block text-gray-700 font-medium flex items-center">
                            <DocumentTextIcon className="h-5 w-5 mr-2 text-indigo-500" />
                            Catatan (Opsional)
                        </label>
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            rows="3"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                            placeholder="Tambahkan catatan jika ada..."
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Menyimpan...
                                </>
                            ) : "Simpan Presensi"}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
};