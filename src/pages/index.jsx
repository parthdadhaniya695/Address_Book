import React from "react";
import { Box, Typography, Paper, Stack } from "@mui/material";

function HomePage() {
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
        {/* Header Section */}
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <Box
            sx={{
              width: 50,
              height: 50,
              background: "linear-gradient(135deg, #42a5f5, #1e88e5)",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "28px",
            }}
          >
            🏠
          </Box>

          <Typography variant="h4" fontWeight="bold">
            Home Page
          </Typography>
        </Stack>

        {/* Description */}
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ lineHeight: 1.7 }}
        >
          Welcome to your <strong>Contact Management Dashboard</strong>.  
          Use the sidebar to navigate between pages, manage your contacts, 
          and explore your personal profile information.
        </Typography>
      </Paper>
    </Box>
  );
}

export default HomePage;