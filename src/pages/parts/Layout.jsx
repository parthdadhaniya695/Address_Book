import { Box } from "@mui/material";
import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        backgroundColor: "#eef2f6",
      }}
    >
      <Sidebar />

      <Box
        sx={{
          flexGrow: 1,
          padding: 3,
          overflowY: "auto",
        }}
      >
        <Box
          sx={{
            maxWidth: "95%",
            margin: "0 auto",
            backgroundColor: "#fff",
            padding: 3,
            borderRadius: "16px",
            boxShadow: "0px 4px 18px rgba(0,0,0,0.06)",
            minHeight: "200px",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default Layout;