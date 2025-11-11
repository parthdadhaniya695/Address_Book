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
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

function ListContact() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch Contacts (initial load only)
  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("contact/all", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setData([...(response.data?.data ?? [])]);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  // ✅ Delete Contact
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(`contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // After delete -> refresh list (still required)
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // ✅ DataGrid Columns
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
      renderCell: (params) => {
        const phones = params.row?.phones;
        if (!phones || phones.length === 0) return "No data";

        return (
          <Stack spacing={0.3}>
            {phones.map((p, index) => (
              <a
                key={index}
                href={`tel:${p.phone_number}`}
                style={{
                  color: "black",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                {p.phone_number}
              </a>
            ))}
          </Stack>
        );
      },
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
            <Tooltip title="Edit Contact">
              <IconButton color="primary" onClick={() => navigate(`/contacts/edit/${id}`)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Contact">
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
      <Paper elevation={4} sx={{ p: 3, borderRadius: "12px" }}>
        {/* ✅ Header without refresh button */}
        <Stack direction="row" justifyContent="space-between" mb={2}>
          <Typography variant="h5" fontWeight={600}>
            📇 Contact List
          </Typography>

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