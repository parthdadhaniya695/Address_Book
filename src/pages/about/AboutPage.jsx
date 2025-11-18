import React from "react";
import { Box, Typography, Paper, Stack } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import BadgeIcon from "@mui/icons-material/Badge";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person"; // NEW ICON

function AboutPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 4,
          background: "#ffffff",
        }}
      >
        {/* Header */}
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          📘 About Me
        </Typography>

        {/* Key : Value Section */}
        <Stack spacing={2} sx={{ mb: 4, mt: 2 }}>
          {/* Name */}
          <Stack direction="row" spacing={2} alignItems="center">
            <BadgeIcon sx={{ color: "primary.main", width: 32 }} />

            <Box sx={{ display: "flex", gap: 1 }}>
              <Typography
                variant="body1"
                sx={{ width: 110, fontWeight: "bold" }}
              >
                Name:
              </Typography>
              <Typography variant="body1">Dadhaniya Parth</Typography>
            </Box>
          </Stack>

          {/* Program */}
          <Stack direction="row" spacing={2} alignItems="center">
            <WorkspacePremiumIcon sx={{ color: "primary.main", width: 32 }} />

            <Box sx={{ display: "flex", gap: 1 }}>
              <Typography
                variant="body1"
                sx={{ width: 110, fontWeight: "bold" }}
              >
                Program:
              </Typography>
              <Typography variant="body1">B-Tech CSE (Semester 6)</Typography>
            </Box>
          </Stack>

          {/* University */}
          <Stack direction="row" spacing={2} alignItems="center">
            <SchoolIcon sx={{ color: "primary.main", width: 32 }} />

            <Box sx={{ display: "flex", gap: 1 }}>
              <Typography
                variant="body1"
                sx={{ width: 110, fontWeight: "bold" }}
              >
                University:
              </Typography>
              <Typography variant="body1">Darshan University</Typography>
            </Box>
          </Stack>
        </Stack>

        {/* Contact Section */}
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <PersonIcon sx={{ color: "primary.main", width: 32 }} />
          <Typography variant="h5" fontWeight="bold">
            Contact Details
          </Typography>
        </Stack>

        <Stack spacing={2}>

          {/* Phone */}
          <Stack direction="row" spacing={2} alignItems="center">
            <PhoneIcon sx={{ color: "primary.main", width: 32 }} />

            <Box sx={{ display: "flex", gap: 1 }}>
              <Typography
                variant="body1"
                sx={{ width: 110, fontWeight: "bold" }}
              >
                Phone:
              </Typography>
              <Typography variant="body1">+91 99250 21322</Typography>
            </Box>
          </Stack>

          {/* Email */}
          <Stack direction="row" spacing={2} alignItems="center">
            <EmailIcon sx={{ color: "primary.main", width: 32 }} />

            <Box sx={{ display: "flex", gap: 1 }}>
              <Typography
                variant="body1"
                sx={{ width: 110, fontWeight: "bold" }}
              >
                Email:
              </Typography>
              <Typography variant="body1">
                parthdadhaniya6@gmail.com
              </Typography>
            </Box>
          </Stack>

        </Stack>
      </Paper>
    </Box>
  );
}

export default AboutPage;