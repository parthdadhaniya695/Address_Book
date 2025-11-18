import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import {
  Paper,
  Snackbar,
  Stack,
  Typography,
  CircularProgress,
  Box,
  Alert,
  IconButton,
  Fab,
  Tooltip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

function ListContact() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const navigate = useNavigate();

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await api.get("contact/all");
      setData(res.data.data);
    } catch (error) {
      console.error("Failed to fetch contacts", error);
      setSnackbar({
        open: true,
        message: "Failed to fetch contacts",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const handleEdit = (id) => navigate(`/contact/edit/${id}`);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/contact/${id}`);
      setSnackbar({
        open: true,
        message: "Contact deleted successfully!",
        severity: "success",
      });
      fetchContacts();
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to delete contact",
        severity: "error",
      });
    }
  };

  // ---------------------------
  // 🔥 UPDATED COLUMNS
  // ---------------------------
  const columns = [
    { field: "display_name", headerName: "Name", flex: 1 },
    { field: "given_name", headerName: "First Name", flex: 1 },
    { field: "family_name", headerName: "Last Name", flex: 1 },
    { field: "job_title", headerName: "Job Title", flex: 1 },
    { field: "notes", headerName: "Notes", flex: 1 },

    // 📌 EMAIL COLUMN ADDED
    {
      field: "emails",
      headerName: "Email",
      flex: 1,
      valueGetter: (value) => value?.[0]?.email || "No Email",
    },

    // 📌 PHONE COLUMN
    {
      field: "phones",
      headerName: "Phone Number",
      flex: 1,
      valueGetter: (value) => value?.[0]?.phone_number || "No Phone",
    },

    // 📌 ACTIONS COLUMN
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.7,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconButton color="primary" size="small" onClick={() => handleEdit(params.row.id)}>
            <EditIcon fontSize="small" />
          </IconButton>

          <IconButton color="error" size="small" onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3, position: "relative" }}>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            📇 Contact List
          </Typography>
        </Stack>

        {/* Data Table / Loading */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
            <CircularProgress />
          </Box>
        ) : data.length === 0 ? (
          <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 4 }}>
            No contacts found. Click “+” to create one.
          </Typography>
        ) : (
          <div style={{ height: 450, width: "100%" }}>
            <DataGrid
              rows={data}
              columns={columns}
              getRowId={(row) => row.id}
              initialState={{
                pagination: { paginationModel: { pageSize: 5 } },
              }}
              pageSizeOptions={[5, 10, 20]}
              sx={{
                border: "none",
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#f5f5f5",
                  fontWeight: "bold",
                },
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "#fafafa",
                },
              }}
            />
          </div>
        )}
      </Paper>

      {/* Floating Add Button */}
      <Tooltip title="Add Contact">
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => navigate("/contact/add")}
          sx={{
            position: "absolute",
            bottom: 24,
            right: 24,
            boxShadow: 4,
          }}
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled" sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ListContact;