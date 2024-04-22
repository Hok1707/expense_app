import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Container,
  Typography,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { get, setAuthToken } from "../../utils/ApiConfig";
import localStorageUtil from "../../utils/LocalStorage";
import TransactionCell from "./DateFormat";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [enqData, setEnqData] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleBack = () => {
    navigate("/transaction/do");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setAuthToken(localStorageUtil.localStorage.getItem("token"));
        const res = await get("/api/v1/dashboard");
        console.log("response => ", res.data);
        if (res.status === 200) {
          setEnqData(res.data.listUser);
        }
      } catch (error) {
        console.error("Error getting dashboard data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchTransactionData = async () => {
      try {
        setAuthToken(localStorageUtil.localStorage.getItem("token"));
        const res = await get("/api/v1/dashboard");
        if (res.status === 200) {
          setTransactionData(res.data.listTransaction);
        }
      } catch (error) {
        console.error("Error getting transaction data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    fetchTransactionData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ background: "#E4F0F9", minHeight: "100vh" }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="h4"
                align="center"
                gutterBottom
                style={{ fontFamily: "sans-serif" }}
              >
                Dashboard
              </Typography>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography variant="h6" gutterBottom>
                Statistics
              </Typography>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography variant="h6" gutterBottom>
                Users
              </Typography>
              <TableContainer
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                style={{
                  maxHeight: 400,
                  overflowY: "auto",
                  border: "1px solid #ddd",
                }}
              >
                <Table style={{ borderCollapse: "collapse" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Username</TableCell>
                      <TableCell>Email</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {enqData &&
                      enqData.map((enq, index) => (
                        <TableRow
                          key={index}
                          style={{ border: "1px solid #ddd" }}
                        >
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{enq.username}</TableCell>
                          <TableCell>{enq.email}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={12}></Grid>
          <Grid item xs={12}>
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h6" align="center" gutterBottom>
                List of Transactions
              </Typography>
            </motion.div>
          </Grid>
          <Grid item xs={12}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <TableContainer
                component={motion.div}
                style={{
                  maxHeight: 400,
                  overflowY: "auto",
                  border: "1px solid #ddd",
                }}
              >
                <Table style={{ borderCollapse: "collapse" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Type</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transactionData.map((transaction, index) => (
                      <TableRow
                        key={index}
                        style={{ border: "1px solid #ddd" }}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TransactionCell date={transaction.date} />
                        <TableCell>${transaction.amount}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell
                          style={{
                            color:
                              transaction.type === "income" ? "blue" : "red",
                          }}
                        >
                          {transaction.type}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <Container maxWidth="sm">
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h6" align="center" gutterBottom>
                Menu
              </Typography>
              <Button variant="contained" onClick={toggleMenu}>
                Close Menu
              </Button>
            </motion.div>
          </Container>
        </motion.div>
      )}
      <Button variant="outlined" color="primary" onClick={handleBack}>
        Back
      </Button>
    </div>
  );
};

export default Dashboard;
