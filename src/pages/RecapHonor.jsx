import { useEffect, useState } from "react";
import { AppLayout } from "../layouts/AppLayout";
import { GetMembersData } from "../api/UserApi";

export const RecapHonor = () => {
    const [members, setMembers] = useState([]);
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchMembers = async () => {
            setLoading(true);
            try {
                const response = await GetMembersData();
                setMembers(response.data.users.filter((user) => user.role === "member"));
            } catch (err) {
                setErrors(err);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchMembers();
    }, []);

    // Format currency helper
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMembers = members.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(members.length / itemsPerPage);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <AppLayout>
            <div className="p-4 sm:p-6 mt-16">
                <h1 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">Rekap Honor</h1>
                
                {loading ? (
                    <div className="flex justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <>
                        {/* Desktop Table */}
                        <div className="hidden lg:block overflow-x-auto rounded-lg shadow border border-gray-200">
                            <table className="min-w-full bg-white divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Foto</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIM</th>
                                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Presensi</th>
                                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Honor per Pertemuan</th>
                                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Total Honor</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {currentMembers.map((member) => (
                                        <tr key={member.id}>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <img
                                                    src={member.image || "/default-avatar.png"}
                                                    alt={member.name}
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{member.name}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{member.nim}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-center">{member.presence_count || 0}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-center capitalize">{member.honor?.category || '-'}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-center">
                                                {member.honor?.amount ? formatCurrency(member.honor.amount) : '-'}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                                                {member.honor?.amount ? formatCurrency(member.honor.amount * (member.presence_count || 0)) : '-'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="lg:hidden space-y-4">
                            {currentMembers.map((member) => (
                                <div key={member.id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
                                    <div className="flex items-start space-x-4">
                                        <img
                                            src={member.image || "/default-avatar.png"}
                                            alt={member.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <div>
                                                    <h3 className="font-medium text-gray-900">{member.name}</h3>
                                                    <p className="text-sm text-gray-500">{member.nim}</p>
                                                </div>
                                            </div>
                                            
                                            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                                                <div>
                                                    <p className="text-gray-500">Presensi</p>
                                                    <p className="text-gray-900 font-medium">{member.presence_count || 0}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-500">Kategori</p>
                                                    <p className="text-gray-900 capitalize">{member.honor?.category || '-'}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-500">Honor/pertemuan</p>
                                                    <p className="text-gray-900">
                                                        {member.honor?.amount ? formatCurrency(member.honor.amount) : '-'}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-500">Total Honor</p>
                                                    <p className="text-gray-900 font-medium">
                                                        {member.honor?.amount ? formatCurrency(member.honor.amount * (member.presence_count || 0)) : '-'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center mt-6 space-x-2">
                            <button
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-3 py-1 text-sm border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                            >
                                &larr; Prev
                            </button>
                            
                            {totalPages > 5 ? (
                                <>
                                    {currentPage > 2 && (
                                        <button
                                            onClick={() => goToPage(1)}
                                            className={`px-3 py-1 text-sm border rounded ${currentPage === 1 ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                                        >
                                            1
                                        </button>
                                    )}
                                    {currentPage > 3 && <span className="px-2 py-1">...</span>}
                                    {[
                                        currentPage - 1,
                                        currentPage,
                                        currentPage + 1
                                    ].filter(page => page > 0 && page <= totalPages).map(page => (
                                        <button
                                            key={page}
                                            onClick={() => goToPage(page)}
                                            className={`px-3 py-1 text-sm border rounded ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    {currentPage < totalPages - 2 && <span className="px-2 py-1">...</span>}
                                    {currentPage < totalPages - 1 && (
                                        <button
                                            onClick={() => goToPage(totalPages)}
                                            className={`px-3 py-1 text-sm border rounded ${currentPage === totalPages ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                                        >
                                            {totalPages}
                                        </button>
                                    )}
                                </>
                            ) : (
                                [...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => goToPage(index + 1)}
                                        className={`px-3 py-1 text-sm border rounded ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                                    >
                                        {index + 1}
                                    </button>
                                ))
                            )}

                            <button
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 text-sm border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                            >
                                Next &rarr;
                            </button>
                        </div>
                    </>
                )}
                
                {errors && (
                    <div className="mt-4 p-3 bg-red-50 text-red-600 rounded text-sm">
                        Terjadi kesalahan saat memuat data. Silakan coba lagi.
                    </div>
                )}
            </div>
        </AppLayout>
    );
};