import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import {
  Paper,
  Box,
  Stack,
  Typography,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

function ListContact() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem("token");
      const ans = await api.get("contact/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(ans.data?.data ?? []);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(`contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const columns = [
    { field: "display_name", headerName: "Name", flex: 1 },
    { field: "given_name", headerName: "First Name", flex: 1 },
    { field: "family_name", headerName: "Last Name", flex: 1 },
    { field: "job_title", headerName: "Job Title", flex: 1 },
    { field: "notes", headerName: "Notes", flex: 1 },
    {
      field: "phones",
      headerName: "Phone Number",
      flex: 1,
      valueGetter: (params) =>
        params.row?.phones?.length ? params.row.phones[0]?.phone_number : "No data",
    },
    {
      field: "action",
      headerName: "Actions",
      width: 130,
      sortable: false,
      renderCell: (params) => {
        const id = params.row._id || params.row.id;
        return (
          <Stack direction="row" spacing={1}>
            <Tooltip title="Edit">
              <IconButton
                color="primary"
                onClick={() => navigate(`/contacts/update/${id}`)}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton color="error" onClick={() => handleDelete(id)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        );
      },
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Box sx={{ p: 3, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <Paper elevation={4} sx={{ p: 3, borderRadius: "12px", background: "#fff" }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h5" fontWeight={600}>
            📇 Contact List
          </Typography>

          <Stack direction="row" spacing={1}>
            <Tooltip title="Refresh">
              <IconButton
                color="primary"
                onClick={fetchContacts}
                sx={{
                  backgroundColor: "#e3f2fd",
                  "&:hover": { backgroundColor: "#bbdefb" },
                }}
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>

            <Button
              variant="contained"
              color="success"
              startIcon={<AddCircleOutlineIcon />}
              sx={{ textTransform: "none", borderRadius: 2 }}
              onClick={() => navigate("/contacts/create")}
            >
              Add Contact
            </Button>
          </Stack>
        </Stack>

        <Box sx={{ height: 450 }}>
          <DataGrid
            rows={data}
            getRowId={(row) => row._id || row.id}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{
              border: "none",
              background: "#fafafa",
              borderRadius: "8px",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#1976d2",
                color: "black",
                fontSize: "15px",
                fontWeight: "bold",
              },
              "& .MuiDataGrid-cell": { fontSize: "14px" },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#e3f2fd",
              },
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
}

export default ListContact;