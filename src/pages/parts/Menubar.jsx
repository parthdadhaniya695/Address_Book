/* eslint-disable */
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";

function Menubar() {
  const navigate = useNavigate();

  // Logout logic
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

          {/* LEFT = PNG LOGO ONLY */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link to="/">
              <img
                src="/contact-card.png"
                alt="logo"
                style={{
                  width: 40,
                  height: 40,
                  objectFit: "contain",
                  cursor: "pointer",
                }}
              />
            </Link>
          </Box>

          {/* RIGHT = LOGOUT BUTTON */}
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleLogout}
          >
            Logout
          </Button>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Menubar;