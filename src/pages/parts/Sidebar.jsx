/* eslint-disable */
import React from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Divider,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactsIcon from "@mui/icons-material/Contacts";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Home", icon: <HomeIcon />, path: "/" },
    { name: "About", icon: <InfoIcon />, path: "/about" },
    { name: "Contacts", icon: <ContactsIcon />, path: "/contacts" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Box
      sx={{
        width: 240,
        height: "100%",
        background: "linear-gradient(180deg, #ffffff 0%, #f2f5f9 100%)",
        borderRight: "1px solid #e3e6ea",
        display: "flex",
        flexDirection: "column",
        boxShadow: "2px 0 12px rgba(0,0,0,0.04)",
      }}
    >
      {/* Menu Items */}
      <List sx={{ flexGrow: 1, mt: 3 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <ListItemButton
              key={item.name}
              component={Link}
              to={item.path}
              sx={{
                mb: 1.5,
                mx: 2,
                py: 1.5,
                borderRadius: "12px",
                backgroundColor: isActive ? "#1976d2" : "transparent",
                color: isActive ? "#fff" : "#333",
                fontWeight: 500,
                boxShadow: isActive
                  ? "0 4px 12px rgba(25,118,210,0.25)"
                  : "none",
                transition: "0.25s ease",
                "&:hover": {
                  backgroundColor: isActive ? "#115293" : "#e7ebf0",
                },
              }}
            >
              <ListItemIcon sx={{ color: isActive ? "#fff" : "#333" }}>
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                  fontSize: "0.95rem",
                  fontWeight: 600,
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Divider />

      {/* Logout */}
      <Box sx={{ p: 2 }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: 600,
            py: 1,
            backgroundColor: "#d32f2f",
            "&:hover": { backgroundColor: "#b71c1c" },
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}

export default Sidebar;