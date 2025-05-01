import { useAuth } from "../context/AuthContext";
import { AppLayout } from "../layouts/AppLayout";
import {
    EnvelopeIcon,
    PhoneIcon,
    IdentificationIcon,
    UserCircleIcon,
    AcademicCapIcon,
    CheckCircleIcon,
    XCircleIcon,
    PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export const Profile = () => {
    const { user } = useAuth();

    return (
        <AppLayout>
            <div className="max-w-4xl mx-auto mt-20 md:mt-12 lg:mt-0 p-6 md:p-8 bg-white border border-gray-100 shadow-xl rounded-3xl relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-50 rounded-full opacity-50"></div>
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-50 rounded-full opacity-50"></div>

                {/* Edit button */}
                <Link
                    to="/profile/edit"
                    className="absolute top-6 right-6 inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-full transition-all shadow-md hover:shadow-lg z-20"
                >
                    <PencilSquareIcon className="h-4 w-4 mr-2" />
                    Edit Profile
                </Link>

                <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                    {/* Profile Image with edit overlay */}
                    <div className="relative group">
                        <img
                            src={user?.image || "/default-profile.png"}
                            alt="Profile"
                            className="w-36 h-36 rounded-full object-cover border-4 border-indigo-500 shadow-lg transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <PencilSquareIcon className="h-6 w-6 text-white" />
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <h2 className="text-3xl font-extrabold text-gray-800 flex items-center gap-2">
                                <UserCircleIcon className="h-7 w-7 text-indigo-500" />
                                {user?.name}
                                {user?.verified && (
                                    <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full ml-2">
                                        Verified
                                    </span>
                                )}
                            </h2>
                        </div>
                        <p className="text-gray-500 text-sm mt-1">@{user?.username}</p>

                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-gray-800">
                            <InfoItem
                                icon={<IdentificationIcon className="h-5 w-5" />}
                                label="NIM"
                                value={user?.nim}
                                className="bg-indigo-100 p-3 rounded-xl"
                            />
                            <InfoItem
                                icon={<AcademicCapIcon className="h-5 w-5" />}
                                label="Kelas"
                                value={user?.class}
                                className="bg-purple-100 p-3 rounded-xl"
                            />
                            <InfoItem
                                icon={<PhoneIcon className="h-5 w-5" />}
                                label="No. HP"
                                value={user?.phone}
                                className="bg-blue-100 p-3 rounded-xl"
                            />
                            <InfoItem
                                icon={<EnvelopeIcon className="h-5 w-5" />}
                                label="Email"
                                value={user?.email}
                                className="bg-green-100 p-3 rounded-xl"
                            />

                            <div className="sm:col-span-2">
                                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-xl text-white">
                                    <p className="font-medium mb-2">Jumlah Presensi:</p>
                                    <div className="flex items-center gap-2">
                                        <span className="inline-flex items-center px-3 py-1 bg-white text-indigo-700 text-xs font-semibold rounded-full">
                                            <CheckCircleIcon className="h-4 w-4 mr-1" />
                                            {user?.presence || 0} Kehadiran
                                        </span>
                                        <span className="text-xs opacity-80 ml-auto">
                                            Terakhir update: {new Date().toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional stats section */}
            </div>
        </AppLayout>
    );
};

// Komponen kecil untuk info pengguna
const InfoItem = ({ icon, label, value, className = "" }) => (
    <div className={`flex items-start gap-3 ${className}`}>
        <div className="text-indigo-500 p-1 bg-white rounded-lg shadow-sm">
            {icon}
        </div>
        <div>
            <p className="text-xs text-gray-500 font-medium">{label}</p>
            <p className="text-sm font-medium text-gray-700">
                {value || <span className="text-gray-400">-</span>}
            </p>
        </div>
    </div>
);