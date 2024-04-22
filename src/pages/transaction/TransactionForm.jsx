import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import { post, setAuthToken } from "../../utils/ApiConfig";
import localStorageUtil from "../../utils/LocalStorage";
import ErrorModal from "../../utils/ErrorModal";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";

const TransactionForm = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setAuthToken(localStorageUtil.localStorage.getItem("token"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await post(`/api/v1/transaction/create`, {
        amount: amount,
        description: description,
        category: category,
        type: type,
      });
      if (res.status === 200) {
        navigate("/transaction/user");
      }
    } catch (error) {
      console.error("error", error);
      setErrorMessage(error.response.data.message);
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setErrorMessage("");
  };

  return (
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
          style={{ marginBottom: 20 }}
        >
          Create a Transaction
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
            label="Amount"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            style={{ marginBottom: 10 }}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ marginBottom: 10 }}
          />
          <FormControl fullWidth style={{ marginBottom: 10 }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <MenuItem value="Food">Food</MenuItem>
              <MenuItem value="Transport">Transport</MenuItem>
              <MenuItem value="Shopping">Shopping</MenuItem>
              <MenuItem value="Salary">Salary</MenuItem>
              <MenuItem value="School">School</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth style={{ marginBottom: 20 }}>
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              labelId="type-label"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <MenuItem value="income">Income</MenuItem>
              <MenuItem value="outcome">Outcome</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginBottom: 20 }}
          >
            Create Transaction
          </Button>
        </form>
        <Link to={"/transaction/user"}>
          <IconButton>
            <ArrowBackSharpIcon titleAccess="List Transaction" />
          </IconButton>
        </Link>
      </motion.div>
      <ErrorModal
        open={openModal}
        handleClose={handleCloseModal}
        errorMessage={errorMessage}
      />
    </Container>
  );
};

export default TransactionForm;
