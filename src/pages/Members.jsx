import { useEffect, useState } from "react";
import { AppLayout } from "../layouts/AppLayout";
import { GetMembersData, UpdateUser } from "../api/UserApi";
import { Switch } from "@headlessui/react";

export const Members = () => {
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

    const toggleStatus = async (id) => {
        const targetMember = members.find((m) => m.id === id);
        const newStatus = targetMember.status === "active" ? "inactive" : "active";

        // Optimistic update
        setMembers((prevMembers) =>
            prevMembers.map((member) =>
                member.id === id ? { ...member, status: newStatus } : member
            )
        );

        try {
            await UpdateUser({ status: newStatus }, id);
        } catch (error) {
            console.error("Error updating status:", error);
            setErrors(error);
            // Rollback
            setMembers((prevMembers) =>
                prevMembers.map((member) =>
                    member.id === id ? { ...member, status: targetMember.status } : member
                )
            );
        }
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
                <h1 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">Data Anggota</h1>
                
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
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kelas</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telepon</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
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
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{member.name}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{member.nim}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{member.email}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{member.class}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{member.phone}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 capitalize">{member.status}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                <Switch
                                                    checked={member.status === "active"}
                                                    onChange={() => toggleStatus(member.id)}
                                                    className={`${member.status === "active" ? "bg-green-500" : "bg-gray-300"} 
                                                        relative inline-flex h-6 w-11 items-center rounded-full`}
                                                >
                                                    <span
                                                        className={`${member.status === "active" ? "translate-x-6" : "translate-x-1"} 
                                                            inline-block h-4 w-4 transform rounded-full bg-white transition`}
                                                    />
                                                </Switch>
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
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-medium text-gray-900">{member.name}</h3>
                                                    <p className="text-sm text-gray-500">{member.nim}</p>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <span className={`px-2 py-1 text-xs rounded-full capitalize 
                                                        ${member.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                                                        {member.status}
                                                    </span>
                                                    <Switch
                                                        checked={member.status === "active"}
                                                        onChange={() => toggleStatus(member.id)}
                                                        className={`${member.status === "active" ? "bg-green-500" : "bg-gray-300"} 
                                                            relative inline-flex h-5 w-9 items-center rounded-full`}
                                                    >
                                                        <span
                                                            className={`${member.status === "active" ? "translate-x-4" : "translate-x-1"} 
                                                                inline-block h-3 w-3 transform rounded-full bg-white transition`}
                                                        />
                                                    </Switch>
                                                </div>
                                            </div>
                                            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                                                <div>
                                                    <p className="text-gray-500">Email</p>
                                                    <p className="text-gray-900 truncate">{member.email}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-500">Kelas</p>
                                                    <p className="text-gray-900">{member.class}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-500">Telepon</p>
                                                    <p className="text-gray-900">{member.phone}</p>
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