/* eslint-disable */
import React from "react";
import { Box, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactsIcon from "@mui/icons-material/Contacts";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Home", icon: <HomeIcon />, path: "/" },
    { name: "About", icon: <InfoIcon />, path: "/about" },
    { name: "Contacts", icon: <ContactsIcon />, path: "/contacts" },
  ];

  return (
    <Box
      sx={{
        width: 220,
        height: "100vh",
        backgroundColor: "#f5f5f5",
        borderRight: "1px solid #ddd",
        paddingTop: 2,
      }}
    >
      <List>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <ListItemButton
              key={item.name}
              component={Link}
              to={item.path}
              sx={{
                mb: 1,
                borderRadius: 1,
                mx: 1,
                backgroundColor: isActive ? "primary.main" : "transparent",
                color: isActive ? "#fff" : "black",
                "&:hover": {
                  backgroundColor: isActive ? "primary.dark" : "#e0e0e0",
                },
              }}
            >
              <ListItemIcon sx={{ color: isActive ? "#fff" : "black" }}>
                {item.icon}
              </ListItemIcon>

              <ListItemText primary={item.name} />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}

export default Sidebar;
