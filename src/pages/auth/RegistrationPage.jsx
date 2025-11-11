import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Avatar,
  Button,
  TextField,
  Box,
  Typography,
  Container,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff, LockOutlined } from "@mui/icons-material";

export default function RegisterPage() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [openMsg, setOpenMsg] = useState(false);
  const [msgToDisplay, setMsgToDisplay] = useState("");
  const [msgType, setMsgType] = useState("info");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!data.username || !data.email || !data.password) {
      setMsgToDisplay("Please fill all required fields");
      setMsgType("warning");
      setOpenMsg(true);
      return;
    }

    try {
      const res = await fetch("http://srv1022055.hstgr.cloud:3001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        setMsgType("success");
        setMsgToDisplay(result.message || "Registration successful!");
        setOpenMsg(true);
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMsgType("error");
        setMsgToDisplay(result.message || "Registration failed");
        setOpenMsg(true);
      }
    } catch (error) {
      setMsgType("error");
      setMsgToDisplay("Server error, please try again later.");
      setOpenMsg(true);
    }
  };

  const handleClose = () => setOpenMsg(false);

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={6}
        sx={{
          mt: 8,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 3,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlined />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>

        <Box component="form" onSubmit={handleRegister} sx={{ mt: 3 }}>
          <TextField
            required
            fullWidth
            label="Username"
            margin="normal"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />

          <TextField
            required
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />

          <TextField
            required
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            margin="normal"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, py: 1.5 }}
          >
            Register
          </Button>

          <Typography align="center" sx={{ mt: 2 }}>
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </Box>
      </Paper>

      {/* Snackbar for messages */}
      <Snackbar open={openMsg} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
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