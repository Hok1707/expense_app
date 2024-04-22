import { useState } from "react";
import { motion } from "framer-motion";
import { Container, Typography, TextField, Button } from "@mui/material";
import { post } from "../../utils/ApiConfig";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await post(`/api/v1/auth/register`, {
        email: email,
        username: username,
        password: password,
      });
      if (res.status === 200) {
        console.log("res", res);
      }
    } catch (error) {
      console.error("error", error);
      setError(error.response.data.message);
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(to bottom right, #4a69bb, #1e3c72)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm" style={{ marginTop: 100 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            padding: 20,
            borderRadius: 8,
            background: "#f0f0f0",
            boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            style={{ marginBottom: 10, marginTop: 10, fontFamily: "inherit" }}
          >
            Create an account
          </Typography>
          <form
            onSubmit={handleSubmit}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ marginBottom: 10 }}
            />
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              margin="normal"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ marginBottom: 10 }}
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ marginBottom: 20 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginBottom: 20 }}
            >
              Sign up
            </Button>
            {error && (
              <Typography
                variant="body2"
                color="error"
                align="center"
                style={{ marginBottom: 20 }}
              >
                {error}
              </Typography>
            )}
          </form>
        </motion.div>
      </Container>
    </div>
  );
};

export default Register;