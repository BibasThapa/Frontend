import React, { useEffect, useState } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete } from 'react-icons/ai';
import { useTheme } from 'next-themes';
import { FiEdit2 } from "react-icons/fi";
import { useDeleteCourseMutation, useGetAllCoursesQuery } from '@/redux/features/courses/coursesApi';
import Loader from '@/components/Loader/Loader';
import { format } from "timeago.js";
import { styles } from '@/app/styles/style';
import toast from 'react-hot-toast';
import Link from 'next/link';

type Props = {}

const AllCourses = (props: Props) => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");
  const { isLoading, data, refetch } = useGetAllCoursesQuery({}, { refetchOnMountOrArgChange: true });
  const [deleteCourse, { isSuccess, error }] = useDeleteCourseMutation({});

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Course Title", flex: 1 },
    { field: "ratings", headerName: "Ratings", flex: 0.5 },
    { field: "purchased", headerName: "Purchased", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: any) => (
        <Link href={`/admin/edit-course/${params.row.id}`}>
          <FiEdit2 className={theme === "dark" ? "text-white" : "text-black"} size={20} />
        </Link>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => (
        <Button
          onClick={() => {
            setOpen(true);
            setCourseId(params.row.id);
          }}
        >
          <AiOutlineDelete className={theme === "dark" ? "text-white" : "text-black"} size={20} />
        </Button>
      ),
    },
  ];

  const rows: any = [];
  if (data) {
    data.courses.forEach((item: any) => {
      rows.push({
        id: item._id,
        title: item.name,
        ratings: item.ratings,
        purchased: item.purchased,
        created_at: format(item.createdAt),
      });
    });
  }

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      refetch();
      toast.success("Course Deleted Successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);

  const handleDelete = async () => {
    await deleteCourse(courseId);
  };

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box mx="20px">
          <Box
            boxShadow="0 0 40px 0"
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "lightgray" : "#000", 
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "lightgray" : "#000",
                borderBottom: theme === "dark" ? "1px solid #ffffff30!important" : "1px solid #ccc!important",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "lightgray" : "#000",
              },
              "& .MuiDataGrid-cell": {
                color: theme === "dark" ? "#FFFFFF" : "#000",
                borderBottom: "none",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme === "dark" ? "#1e2029" : "#4AA9FC",
                color: theme === "dark" ? "#FFFFFF" : "#000",
                fontSize: "16px",
                fontWeight: "bold",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#4AA9FC",
                color: theme === "dark" ? "#FFFFFF" : "#000",
                fontSize: "14px",
              },
              "& .MuiCheckbox-root": {
                color: theme === "dark" ? "lightgray !important" : "#000 !important",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: theme === "dark" ? "#FFFFFF" : "#000",
              },
            }}
          >
            <DataGrid
              checkboxSelection
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 100, page: 0 },
                },
              }}
              pageSizeOptions={[100]}
            />
          </Box>

          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow-lg p-6">
                <h1 className={`${styles.title} text-lg font-semibold`}>Are you sure you want to delete this course?</h1>
                <div className="flex items-center justify-between mt-6">
                  <Button
                    className={`${styles.button} w-[120px] bg-[#57c7a3] text-white hover:bg-[#45a285]`}
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className={`${styles.button} w-[120px] bg-[#d63f3f] text-white hover:bg-[#b23535]`}
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
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
