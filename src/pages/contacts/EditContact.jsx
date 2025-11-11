import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { TextField, Button, Stack, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

function EditContact() {
  const [formData, setFormData] = useState({
    display_name: "",
    given_name: "",
    family_name: "",
    company: "",
    job_title: "",
    notes: "",
    phones: [{ phone_number: "" }],
    emails: [{ email: "" }],
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContact = async () => {
      const token = localStorage.getItem("token");
      const res = await api.get(`contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData(res.data.data);
    };
    fetchContact();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await api.post(`contact/update/${id}`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert("Contact updated successfully!");
    navigate("/contacts/list");
  };

  return (
    <Paper sx={{ p: 4, width: 500, mx: "auto", mt: 5 }}>
      <h2>Edit Contact</h2>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField label="Display Name" name="display_name" value={formData.display_name} onChange={handleChange} />
          <TextField label="Given Name" name="given_name" value={formData.given_name} onChange={handleChange} />
          <TextField label="Family Name" name="family_name" value={formData.family_name} onChange={handleChange} />
          <TextField label="Job Title" name="job_title" value={formData.job_title} onChange={handleChange} />
          <TextField label="Notes" name="notes" value={formData.notes} onChange={handleChange} />
          <TextField
            label="Phone Number"
            value={formData.phones?.[0]?.phone_number || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                phones: [{ ...formData.phones[0], phone_number: e.target.value }],
              })
            }
          />
          <TextField
            label="Email"
            value={formData.emails?.[0]?.email || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                emails: [{ ...formData.emails[0], email: e.target.value }],
              })
            }
          />
          <Button type="submit" variant="contained" color="primary">
            Update Contact
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}

export default EditContact;