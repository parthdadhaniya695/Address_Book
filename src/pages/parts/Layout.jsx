import { Grid, Box } from "@mui/material";
import React from "react";
import Menubar from "./Menubar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      
      {/* Top Menubar */}
      <Box sx={{ flexShrink: 0 }}>
        <Menubar />
      </Box>

      {/* Main content area (Sidebar + Outlet) */}
      <Box sx={{ flexGrow: 1, display: "flex" }}>
        
        {/* Sidebar */}
        <Box sx={{ width: "220px", bgcolor: "#f5f5f5", p: 2 }}>
          <Sidebar />
        </Box>

        {/* Page Content */}
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Outlet />
        </Box>
      </Box>

    </Box>
  );
}

export default Layout;
