import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function CreateContact() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [openMsg, setOpenMsg] = useState(false);
  const [msgToDisplay, setMsgToDisplay] = useState("");
  const [msgType, setMsgType] = useState("info");

  const [form, setForm] = useState({
    display_name: "",
    given_name: "",
    family_name: "",
    company: "",
    job_title: "",
    notes: "",
    phone_number: "",
    phone_type: "Mobile",
    email: "",
    email_type: "Home",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");

    const dataToSend = {
      display_name: form.display_name,
      given_name: form.given_name,
      family_name: form.family_name,
      company: form.company,
      job_title: form.job_title,
      notes: form.notes,
      phones: [
        {
          phone_number: form.phone_number,
          phone_type: form.phone_type,
          is_primary: 1,
        },
      ],
      emails: [
        {
          email: form.email,
          email_type: form.email_type,
          is_primary: 1,
        },
      ],
    };

    try {
      const res = await api.post("contact/create", dataToSend, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200 || res.status === 201) {
        setMsgType("success");
        setMsgToDisplay("Contact created successfully!");
        setOpenMsg(true);
        setTimeout(() => navigate("/contacts"), 1500);
      } else {
        setMsgType("error");
        setMsgToDisplay(res.data?.message || "Failed to create contact");
        setOpenMsg(true);
      }
    } catch (error) {
      console.error(error);
      setMsgType("error");
      setMsgToDisplay("Server error. Please try again later.");
      setOpenMsg(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={6}
        sx={{ mt: 5, p: 4, borderRadius: 3, backgroundColor: "background.paper" }}
      >
        <Typography variant="h5" textAlign="center" fontWeight={600} gutterBottom>
          Create New Contact
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Display Name"
                name="display_name"
                fullWidth
                value={form.display_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Company"
                name="company"
                fullWidth
                value={form.company}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                name="given_name"
                fullWidth
                value={form.given_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                name="family_name"
                fullWidth
                value={form.family_name}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Job Title"
                name="job_title"
                fullWidth
                value={form.job_title}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Notes"
                name="notes"
                fullWidth
                multiline
                minRows={3}
                value={form.notes}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone Number"
                name="phone_number"
                fullWidth
                value={form.phone_number}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                value={form.email}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, py: 1.3 }}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Contact"}
          </Button>

          <Button
            fullWidth
            sx={{ mt: 1 }}
            onClick={() => navigate("/contacts")}
          >
            Cancel
          </Button>
        </Box>
      </Paper>

      <Snackbar open={openMsg} autoHideDuration={4000} onClose={() => setOpenMsg(false)}>
        <Alert
          onClose={() => setOpenMsg(false)}
          severity={msgType}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {msgToDisplay}
        </Alert>
      </Snackbar>
    </Container>
  );
}