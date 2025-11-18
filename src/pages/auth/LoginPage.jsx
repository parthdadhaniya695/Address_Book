import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff, LockOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [data, setData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [openMsg, setOpenMsg] = useState(false);
  const [msgToDisplay, setMsgToDisplay] = useState("");
  const [msgType, setMsgType] = useState("info");

  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const checkLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "http://srv1022055.hstgr.cloud:3001/api/auth/login",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        }
      );

      const result = await res.json();

      if (result.token) {
        localStorage.setItem("token", result.token);
        setMsgType("success");
        setMsgToDisplay("Login successful!");
        navigate("/");
      } else {
        localStorage.removeItem("token");
        setMsgType("error");
        setMsgToDisplay(result.message || "Invalid credentials");
      }
    } catch (error) {
      setMsgType("error");
      setMsgToDisplay("Server error, please try again later.");
    } finally {
      setOpenMsg(true);
    }
  };

  const handleClose = () => {
    setOpenMsg(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlined />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Box component="form" onSubmit={checkLogin} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            autoFocus
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
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

          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Remember me"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, py: 1.5 }}
          >
            Sign In
          </Button>

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Snackbar for feedback */}
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
