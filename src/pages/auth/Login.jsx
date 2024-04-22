import { useState } from "react";
import { motion } from "framer-motion";
import { Container, Typography, TextField, Button } from "@mui/material";
import { post } from "../../utils/ApiConfig";
import localStorageUtil from "../../utils/LocalStorage";
import { Link, useNavigate } from "react-router-dom";
import ErrorModal from "../../utils/ErrorModal";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await post(`/api/v1/auth/login`, {
        email: email,
        password: password,
      });
      if (res.status === 200) {
        localStorageUtil.localStorage.setItem("token", res.data.access_token);
        navigate("transaction/do");
      }
    } catch (error) {
      console.error("error", error);
      setErrorMessage(error.message);
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
<div
      style={{
        background: "linear-gradient(to bottom right, #2c3e50, #3498db)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            padding: 20,
            borderRadius: 8,
            boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
            background: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            style={{ marginBottom: 10,marginTop:10 }}
            fontFamily={'sans-serif'}
          >
            Sign in to your account
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
              Sign in
            </Button>
            <Typography>
              <Link to={"/register"}>
                Dont have an account? Please Register
              </Link>
            </Typography>
          </form>
          <ErrorModal
            open={openModal}
            handleClose={handleCloseModal}
            errorMessage={errorMessage}
          />
        </motion.div>
      </Container>
    </div>
  );
};

export default Login;
