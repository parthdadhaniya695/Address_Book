import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import {
  Paper,
  Button,
  Stack,
  Box,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RefreshIcon from "@mui/icons-material/Refresh";

function ListContact() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch all contacts
  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem("token");
      const ans = await api.get("contact/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(ans.data.data || []);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // ✅ Delete contact
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await api.delete(`contact/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchContacts();
      } catch (error) {
        console.error("Error deleting contact:", error);
      }
    }
  };

  // ✅ Navigate to edit page
  const handleEdit = (id) => {
    navigate(`/contacts/edit/${id}`);
  };

  // ✅ Table columns
  const columns = [
    { field: "display_name", headerName: "Name", flex: 1, minWidth: 140 },
    { field: "given_name", headerName: "First Name", flex: 1, minWidth: 120 },
    { field: "family_name", headerName: "Last Name", flex: 1, minWidth: 120 },
    { field: "job_title", headerName: "Job Title", flex: 1, minWidth: 130 },
    { field: "notes", headerName: "Notes", flex: 1, minWidth: 150 },
    {
      field: "phones",
      headerName: "Phone Number",
      width: 180,
      valueGetter: (value) => value?.[0]?.phone_number || "No data",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit Contact">
            <IconButton
              color="primary"
              size="small"
              onClick={() => handleEdit(params.row.id || params.row._id)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Contact">
            <IconButton
              color="error"
              size="small"
              onClick={() => handleDelete(params.row.id || params.row._id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  // ✅ Pagination config
  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Box sx={{ p: 3, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <Paper
        elevation={4}
        sx={{
          p: 3,
          borderRadius: 3,
          background: "#fff",
        }}
      >
        {/* ---------- Header ---------- */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h5" fontWeight={600}>
            📇 Address Book
          </Typography>

          <Stack direction="row" spacing={1}>
            <Tooltip title="Refresh">
              <IconButton color="primary" onClick={fetchContacts}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>

            <Button
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              color="success"
              onClick={() => navigate("/contacts/create")}
              sx={{ textTransform: "none", fontWeight: 500 }}
            >
              Add New
            </Button>
          </Stack>
        </Stack>

        {/* ---------- Data Table ---------- */}
        <DataGrid
          getRowId={(row) => row._id || row.id}
          rows={data}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{
            border: 0,
            backgroundColor: "#fafafa",
            borderRadius: 2,
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#1976d2",
              color: "white",
              fontWeight: "bold",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#f0f7ff",
            },
          }}
        />
      </Paper>
    </Box>
  );
}

export default ListContact;