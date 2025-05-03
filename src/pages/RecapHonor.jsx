import { useEffect, useState } from "react";
import { AppLayout } from "../layouts/AppLayout";
import { GetMembersData } from "../api/UserApi";
import { Switch } from "@headlessui/react";

export const RecapHonor = () => {
    const [members, setMembers] = useState([]);
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);

    // Pagination state
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

    const toggleStatus = (id) => {
        setMembers((prevMembers) =>
            prevMembers.map((member) =>
                member.id === id
                    ? { ...member, status: member.status === "active" ? "inactive" : "active" }
                    : member
            )
        );
        // Tambahkan API update ke server jika ada
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
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Rekap Honor</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <div className="overflow-x-auto rounded shadow border border-gray-200">
                            <table className="min-w-full bg-white">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="text-left py-2 px-4">Foto</th>
                                        <th className="text-left py-2 px-4">Nama</th>
                                        <th className="text-left py-2 px-4">NIM</th>
                                        <th className="text-left py-2 px-4">Presensi Tervalidasi</th>
                                        <th className="text-left py-2 px-4">Kategori Honor</th>
                                        <th className="text-left py-2 px-4">Besar Honor</th>
                                        <th className="text-left py-2 px-4">Jumlah Honor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentMembers.map((member) => (
                                        <tr key={member.id} className="border-t">
                                            <td className="py-2 px-4">
                                                <img
                                                    src={member.image || "/default-avatar.png"}
                                                    alt={member.name}
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                            </td>
                                            <td className="py-2 px-4">{member.name}</td>
                                            <td className="py-2 px-4">{member.nim}</td>
                                            <td className="py-2 px-4 text-center">{member.presence_count}</td>
                                            <td className="py-2 px-4 text-center">{member.honor.category}</td>
                                            <td className="py-2 px-4 text-center">Rp. {member.honor.amount}</td>
                                            <td className="py-2 px-4 text-center">Rp. {member.honor.amount * member.presence_count}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex justify-center mt-4 space-x-2">
                            <button
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                            >
                                Prev
                            </button>

                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => goToPage(index + 1)}
                                    className={`px-3 py-1 border rounded ${currentPage === index + 1
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-100 hover:bg-gray-200"
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
                {errors && <p className="text-red-500 mt-4">Terjadi kesalahan saat memuat data.</p>}
            </div>
        </AppLayout>
    );
};
