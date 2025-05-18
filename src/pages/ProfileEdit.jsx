import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { AppLayout } from "../layouts/AppLayout";
import { PencilSquareIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { UpdateUser } from "../api/UserApi";
import { LoaderPuff } from "../components/Loader";

export const ProfileEdit = () => {
    const { user, setUser } = useAuth();
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [imageError, setImageError] = useState(null);


    const [form, setForm] = useState({
        name: user?.name || "",
        username: user?.username || "",
        nim: user?.nim || "",
        class: user?.class || "",
        phone: user?.phone || "",
        image: user?.image || "",
    });
    const [image, setImage] = useState(null)
    const [imageSrc, setImageSrc] = useState(null)

    useEffect(() => {
        if (user) {
            setForm({
                name: user.name || "",
                username: user.username || "",
                nim: user.nim || "",
                class: user.class || "",
                phone: user.phone || "",
                image: user.image || "",
                email: user.email || "",
            });
            setImageSrc(form?.image)
        }
    }, [user])

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                setImageError("Ukuran gambar maksimal 2MB.");
                return;
            }
            const url = URL.createObjectURL(file);
            setImageSrc(url);
            setImage(file);
            setImageError(null);
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const data = new FormData();
        data.append('_method', 'PATCH');
        for (let key in form) {
            if (key !== 'image') {
                data.append(key, form[key]);
            }
        }

        if (image instanceof File) {
            data.append('image', image);
        }

        try {
            const response = await UpdateUser(data, user?.id)
            console.log(response.user)
            if (response.message === 'User updated successfully') {
                setIsSuccess(true);
            } else {
                setIsSuccess(false);
            }
            setUser(response.user)
            return response
        } catch (err) {
            const newErrors = {};

            // Telusuri setiap key di error
            if (err?.errors) {
                for (const key in err.errors) {
                    const messages = err.errors[key];
                    if (Array.isArray(messages) && messages.includes('validation.unique')) {
                        newErrors[key] = 'Data sudah digunakan';
                    } else {
                        newErrors[key] = messages[0]; // ambil pesan pertama (fallback)
                    }
                }
            }
            console.log(newErrors)
            setErrors(newErrors);
        } finally {
            setLoading(false)
        }
    };

    return (
        <AppLayout>
            {isSuccess && (
                <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex justify-center items-center z-50 px-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg text-center">
                        <h2 className="text-xl font-bold text-green-600 mb-4">Akun berhasil diupdate!</h2>
                        <Link to="/profile">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl">
                                Oke
                            </button>
                        </Link>
                    </div>
                </div>
            )}
            <div className="max-w-3xl mx-auto mt-16 bg-white p-8 rounded-3xl shadow-xl border border-gray-100 relative">
                <Link
                    to="/profile"
                    className="absolute top-6 left-6 flex items-center text-indigo-600 hover:text-indigo-800 text-sm"
                >
                    <ArrowLeftIcon className="h-5 w-5 mr-1" />
                    Kembali ke Profil
                </Link>

                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center mt-6">
                    Edit Profil
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Foto Profil */}
                    <div className="flex flex-col items-center">
                        {/* Foto Profil dengan Upload */}
                        <div className="flex flex-col items-center">
                            <div className="relative group">
                                <img
                                    src={imageSrc || "/default-profile.png"}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
                                />
                                <label className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                    <PencilSquareIcon className="h-5 w-5 text-white" />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="absolute opacity-0 w-full h-full cursor-pointer"
                                    />
                                </label>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">Upload foto dari perangkat</p>
                        </div>
                    </div>
                    {imageError && (
                        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-6 max-w-2xl mx-auto">
                            <div className="flex items-center">
                                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <span>{imageError}</span>
                            </div>
                        </div>
                    )}

                    {/* Input Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <InputField label="Nama" name="name" value={form.name} onChange={handleChange} errors={errors} />
                        <InputField label="Username" name="username" value={form.username} onChange={handleChange} errors={errors} />
                        <InputField label="NIM" name="nim" value={form.nim} onChange={handleChange} errors={errors} />
                        <InputField label="Kelas" name="class" value={form.class} onChange={handleChange} errors={errors} />
                        <InputField label="No. HP" name="phone" value={form.phone} onChange={handleChange} errors={errors} />
                        <InputField label="Email" name="email" value={form.email} onChange={handleChange} errors={errors} />
                    </div>

                    <div className="flex justify-center flex-col">
                        {loading ? <LoaderPuff /> : ""}
                        <button
                            type="submit"
                            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-medium shadow-md transition-all mt-4"
                        >
                            Simpan Perubahan
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
};

const InputField = ({ label, name, value, onChange, errors, disabled = false }) => (
    <div className="flex flex-col">
        <label htmlFor={name} className="text-sm font-medium text-gray-600 mb-1">
            {label}
        </label>
        <input
            id={name}
            name={name}
            type="text"
            value={value ?? ""}
            onChange={onChange}
            disabled={disabled}
            className={`px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""
                }`}
        />
        {errors && errors[name] && (
            <p className="text-sm text-red-600 mt-1">{errors[name]}</p>
        )}
    </div>
);
