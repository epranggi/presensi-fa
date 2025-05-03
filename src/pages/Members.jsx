import { useEffect, useState } from "react";
import { AppLayout } from "../layouts/AppLayout";
import { GetMembersData, UpdateUser } from "../api/UserApi";
import { Switch } from "@headlessui/react";

export const Members = () => {
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

    const toggleStatus = async (id) => {
        const targetMember = members.find((m) => m.id === id); // <- Simpan dulu datanya

        const newStatus = targetMember.status === "active" ? "inactive" : "active";

        // Optimistic update
        setMembers((prevMembers) =>
            prevMembers.map((member) =>
                member.id === id ? { ...member, status: newStatus } : member
            )
        );

        try {
            const response = await UpdateUser({ status: newStatus }, id);
            console.log("Status updated:", response);
        } catch (error) {
            console.error("Error updating status:", error);
            setErrors(error);

            // Rollback jika gagal
            setMembers((prevMembers) =>
                prevMembers.map((member) =>
                    member.id === id ? { ...member, status: targetMember.status } : member
                )
            );
        } finally {
            setLoading(false);
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
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Data Anggota</h1>
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
                                        <th className="text-left py-2 px-4">Email</th>
                                        <th className="text-left py-2 px-4">Kelas</th>
                                        <th className="text-left py-2 px-4">Telepon</th>
                                        <th className="text-left py-2 px-4">Status</th>
                                        <th className="text-left py-2 px-4">Aksi</th>
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
                                            <td className="py-2 px-4">{member.email}</td>
                                            <td className="py-2 px-4">{member.class}</td>
                                            <td className="py-2 px-4">{member.phone}</td>
                                            <td className="py-2 px-4 capitalize">{member.status}</td>
                                            <td className="py-2 px-4">
                                                <Switch
                                                    checked={member.status === "active"}
                                                    onChange={() => toggleStatus(member.id)}
                                                    className={`${member.status === "active"
                                                        ? "bg-green-500"
                                                        : "bg-gray-300"
                                                        } relative inline-flex h-6 w-11 items-center rounded-full`}
                                                >
                                                    <span
                                                        className={`${member.status === "active"
                                                            ? "translate-x-6"
                                                            : "translate-x-1"
                                                            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                                                    />
                                                </Switch>
                                            </td>
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
