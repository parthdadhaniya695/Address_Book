import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import * as yup from "yup";
import api from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";

function AddContact() {
  const [data, setData] = useState({
    display_name: "",
    given_name: "",
    family_name: "",
    company: "",
    job_title: "",
    notes: "",
  });
  const [phones, setPhones] = useState([
    { phone_number: "", phone_type: "Office", is_primary: true },
  ]);
  const [emails, setEmails] = useState([
    { email: "", email_type: "Office", is_primary: true },
  ]);
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api.get(`/contact/${id}`).then((res) => {
        const contact = res.data.data[0];
        setData(contact);
        setPhones(contact.phones || []);
        setEmails(contact.emails || []);
      });
    }
  }, [id]);

  const validationSchema = yup.object({
    display_name: yup.string().required("Display name is required"),
    given_name: yup.string().required("Given name is required"),
  });

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePhoneChange = (index, value) => {
    setPhones((prev) =>
      prev.map((ph, i) =>
        i === index ? { ...ph, phone_number: value } : ph
      )
    );
  };

  const handleEmailChange = (index, value) => {
    setEmails((prev) =>
      prev.map((em, i) => (i === index ? { ...em, email: value } : em))
    );
  };

  const handleSave = async () => {
    try {
      await validationSchema.validate(data, { abortEarly: false });
      const mergedData = { ...data, phones, emails };

      if (id) {
        await api.put(`/contact/update/${id}`, mergedData);
      } else {
        await api.post("/contact/create", mergedData);
      }

      navigate("/contacts");
    } catch (err) {
      if (err.inner) {
        const tempErrors = {};
        err.inner.forEach((e) => {
          tempErrors[e.path] = e.message;
        });
        setErrors(tempErrors);
      } else {
        console.error(err);
      }
    }
  };

  const handleCancel = () => {
    navigate("/contacts");
  };

  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Paper
        elevation={6}
        sx={{
          width: "60%",
          p: 4,
          borderRadius: 3,
          background: "linear-gradient(145deg, #fdfdfd, #f5f7fa)",
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={2}>
          {id ? "Edit Contact" : "Add New Contact"}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {/* Basic Info Fields */}
        {[
          { label: "Display Name", name: "display_name" },
          { label: "Given Name", name: "given_name" },
          { label: "Family Name", name: "family_name" },
          { label: "Company Name", name: "company" },
          { label: "Job Title", name: "job_title" },
          { label: "Notes", name: "notes" },
        ].map((field) => (
          <Box key={field.name} mb={2}>
            <Typography fontWeight="500" mb={0.5}>
              {field.label}
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              name={field.name}
              value={data[field.name] || ""}
              onChange={handleChange}
              error={!!errors[field.name]}
              helperText={errors[field.name]}
              sx={{
                backgroundColor: "white",
                borderRadius: 1,
              }}
            />
          </Box>
        ))}

        <Divider sx={{ my: 3 }} />

        {/* Phones Section */}
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Phone Numbers
        </Typography>
        {phones.map((ph, index) => (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            gap={1}
            mb={1.5}
          >
            <TextField
              fullWidth
              variant="outlined"
              label={`Phone #${index + 1}`}
              value={ph.phone_number}
              onChange={(e) => handlePhoneChange(index, e.target.value)}
              sx={{ backgroundColor: "white", borderRadius: 1 }}
            />
            {index === phones.length - 1 && (
              <IconButton
                color="primary"
                onClick={() =>
                  setPhones((prev) => [
                    ...prev,
                    {
                      phone_number: "",
                      phone_type: "Personal",
                      is_primary: false,
                    },
                  ])
                }
              >
                <AddCircleOutline />
              </IconButton>
            )}
            {phones.length > 1 && (
              <IconButton
                color="error"
                onClick={() =>
                  setPhones((prev) => prev.filter((_, i) => i !== index))
                }
              >
                <RemoveCircleOutline />
              </IconButton>
            )}
          </Box>
        ))}

        <Divider sx={{ my: 3 }} />

        {/* Emails Section */}
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Email Addresses
        </Typography>
        {emails.map((em, index) => (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            gap={1}
            mb={1.5}
          >
            <TextField
              fullWidth
              variant="outlined"
              label={`Email #${index + 1}`}
              value={em.email}
              onChange={(e) => handleEmailChange(index, e.target.value)}
              sx={{ backgroundColor: "white", borderRadius: 1 }}
            />
            {index === emails.length - 1 && (
              <IconButton
                color="primary"
                onClick={() =>
                  setEmails((prev) => [
                    ...prev,
                    {
                      email: "",
                      email_type: "Personal",
                      is_primary: false,
                    },
                  ])
                }
              >
                <AddCircleOutline />
              </IconButton>
            )}
            {emails.length > 1 && (
              <IconButton
                color="error"
                onClick={() =>
                  setEmails((prev) => prev.filter((_, i) => i !== index))
                }
              >
                <RemoveCircleOutline />
              </IconButton>
            )}
          </Box>
        ))}

        <Divider sx={{ my: 3 }} />

        {/* Buttons */}
        <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCancel}
            sx={{
              textTransform: "none",
              fontWeight: 500,
              borderRadius: 2,
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{
              textTransform: "none",
              fontWeight: 500,
              borderRadius: 2,
              boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
            }}
          >
            Save
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default AddContact;