import React, { FC, useEffect, useState } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from 'react-icons/ai';
import { useTheme } from 'next-themes';

import Loader from '@/components/Loader/Loader';
import { format } from "timeago.js";
import { useDeleteUserMutation, useGetAllUsersQuery, useUpdateUserRoleMutation } from '@/redux/features/user/userApi';
import { styles } from '@/app/styles/style';
import toast from 'react-hot-toast';

type Props = {
    isTeam: boolean;
};

const AllCourses: FC<Props> = ({ isTeam }) => {
    const { theme } = useTheme();
    const [active, setActive] = useState(false);
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('admin');
    const [open, setOpen] = useState(false);
    const [userId, setUserId] = useState('');
    const [updateUserRole, { error: updateError, isSuccess }] = useUpdateUserRoleMutation();
    const { isLoading, data, refetch } = useGetAllUsersQuery({}, { refetchOnMountOrArgChange: true });
    const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] = useDeleteUserMutation();

    useEffect(() => {
        if (updateError) {
            if ("data" in updateError) {
                const errorMessage = updateError as any;
                toast.error(errorMessage.data.message);
            }
        }
        if (isSuccess) {
            refetch();
            toast.success("User role updated successfully");
            setActive(false);
        }
        if (deleteSuccess) {
            refetch();
            toast.success("Deleted user successfully");
            setOpen(false);
        }
        if (deleteError) {
            if ("data" in deleteError) {
                const errorMessage = deleteError as any;
                toast.error(errorMessage.data.message);
            }
        }
    }, [updateError, isSuccess, deleteSuccess, deleteError, refetch]);

    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        { field: "name", headerName: "Name", flex: 0.5 },
        { field: "email", headerName: "Email", flex: 0.5 },
        { field: "role", headerName: "Role", flex: 0.5 },
        { field: "courses", headerName: "Purchased Courses", flex: 0.5 },
        { field: "created_at", headerName: "Joined At", flex: 0.5 },
        {
            field: "delete",
            headerName: "Delete",
            flex: 0.2,
            renderCell: (params: any) => (
                <Button onClick={() => { setOpen(!open); setUserId(params.row.id); }}>
                    <AiOutlineDelete className={theme === "dark" ? "text-gray-300" : "text-black"} size={20} />
                </Button>
            ),
        },
        {
            field: "emailIcon",
            headerName: "Email",
            flex: 0.2,
            renderCell: (params: any) => (
                <a href={`mailto:${params.row.email}`}>
                    <AiOutlineMail className={theme === "dark" ? "text-gray-300" : "text-black"} size={20} />
                </a>
            ),
        },
    ];

    const rows: any = [];
    if (data && data.users) {
        const filteredUsers = isTeam
            ? data.users.filter((item: any) => item.role === "admin")
            : data.users;

        filteredUsers.forEach((item: any) => {
            rows.push({
                id: item._id,
                name: item.name,
                email: item.email,
                role: item.role,
                courses: item.courses.length,
                created_at: format(item.createdAt),
            });
        });
    }

    const handleSubmit = async () => {
        await updateUserRole({ email, role });
    };

    const handleDelete = async () => {
        await deleteUser(userId);
    };

    return (
        <div className="mt-[120px]">
            {isLoading ? (
                <Loader />
            ) : (
                <Box mx="20px">
                    {isTeam && (
                        <div className="w-full flex justify-end">
                            <div
                                className={`${styles.button} !w-[220px] dark:bg-[#57c7a3] !h-[35px] dark:border dark:border-[#ffffff6c]`}
                                onClick={() => setActive(!active)}
                            >
                                Add New Member
                            </div>
                        </div>
                    )}
                    <br />
                    <Box
                        boxShadow="40px 0 0 0"
                        height="80vh"
                        sx={{
                            "& .MuiDataGrid-root": { border: "none" },
                            "& .MuiDataGrid-sortIcon": { color: theme === "dark" ? "gray" : "#000" },
                            "& .MuiDataGrid-row": {
                                color: theme === "dark" ? "gray" : "#000",
                                borderBottom: theme === "dark" ? "1px solid #ffffff30!important" : "1px solid #ccc!important",
                            },
                            "& .MuiTablePagination-root": { color: theme === "dark" ? "gray" : "#000" },
                            "& .MuiDataGrid-cell": { color: theme === "dark" ? "gray" : "#000", borderBottom: "none" },
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: theme === "dark" ? "#1e2029" : "#4AA9FC",
                                color: theme === "dark" ? "gray" : "#000",
                                fontSize: "16px",
                                fontWeight: "bold",
                            },
                            "& .MuiDataGrid-footerContainer": {
                                backgroundColor: theme === "dark" ? "#3e4396" : "#4AA9FC",
                                color: theme === "dark" ? "gray" : "#000",
                                fontSize: "14px",
                            },
                        }}
                    >
                        <DataGrid
                            checkboxSelection
                            rows={rows}
                            columns={columns}
                            initialState={{
                                pagination: { paginationModel: { pageSize: 100, page: 0 } },
                            }}
                            pageSizeOptions={[100]}
                        />
                    </Box>
                    {active && (
                        <Modal open={active} onClose={() => setActive(!active)}>
                            <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                                <h1 className={`${styles.title}`}>Add New Member</h1>
                                <div className="mt-4">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter email..."
                                        className={`${styles.input}`}
                                    />
                                    <select
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        className={`${styles.input} !mt-6`}
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                    </select>
                                    <div className={`${styles.button} my-6 !h-[30px]`} onClick={handleSubmit}>
                                        Submit
                                    </div>
                                </div>
                            </Box>
                        </Modal>
                    )}
                    {open && (
                        <Modal open={open} onClose={() => setOpen(!open)}>
                            <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                                <h1 className={`${styles.title}`}>Are you sure you want to delete this user?</h1>
                                <div className="flex w-full items-center justify-between mb-6 mt-4">
                                    <div
                                        className={`${styles.button} !w-[120px] bg-[#57c7a3]`}
                                        onClick={() => setOpen(!open)}
                                    >
                                        Cancel
                                    </div>
                                    <div
                                        className={`${styles.button} !w-[120px] h-[30px] bg-[#d63f3f]`}
                                        onClick={handleDelete}
                                    >
                                        Delete
                                    </div>
                                </div>
                            </Box>
                        </Modal>
                    )}
                </Box>
            )}
        </div>
    );
};

export default AllCourses;
