import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { get, setAuthToken } from "../../utils/ApiConfig";
import localStorageUtil from "../../utils/LocalStorage";
import TransactionCell from "../dashboard/DateFormat";
import { Link } from "react-router-dom";
import AddCardSharpIcon from "@mui/icons-material/AddCardSharp";

const TransactionUser = () => {
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [outcome, setOutcome] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setAuthToken(localStorageUtil.localStorage.getItem("token"));
    const fetchData = async () => {
      try {
        const res = await get("/api/v1/transaction/total/amount");
        if (res.status === 200) {
          const data = res.data;
          setIncome(data.data.totalIncome);
          setOutcome(data.data.totalOutcome);
          setTotal(data.data.totalMoney);
          setTransactions(data.listTransaction.reverse());
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ background: "#E4F0F9", minHeight: "100vh" }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card variant="outlined" style={{ marginTop: "50px" }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    style={{ color: "blue" }}
                  >
                    Income: ${income}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={4}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card variant="outlined" style={{ marginTop: "50px" }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    style={{ color: "red" }}
                  >
                    Outcome: ${outcome}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={4}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card variant="outlined" style={{ marginTop: "50px" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Total: ${total}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={12}>
            <TableContainer style={{ maxHeight: 400, overflowY: "auto" }}>
              <Table>
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
                  {transactions.map((transaction, index) => (
                    <TableRow key={transaction._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TransactionCell date={transaction.date} />
                      <TableCell
                        style={{
                          color: transaction.type === "income" ? "blue" : "red",
                        }}
                      >
                        {transaction.amount}
                      </TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell
                        style={{
                          color: transaction.type === "income" ? "blue" : "red",
                        }}
                      >
                        {transaction.type}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={4} />
          <Grid item xs={3} style={{ marginTop: "30px" }}>
            <motion.div
              initial={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link to={"/transaction/do"} style={{ textDecoration: "none" }}>
                <motion.div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#1976d2",
                    color: "white",
                    borderRadius: "10px",
                    padding: "10px 20px",
                    cursor: "pointer",
                  }}
                >
                  <AddCardSharpIcon />
                  <Typography variant="button" sx={{ ml: 1 }}>
                    Create Transaction
                  </Typography>
                </motion.div>
              </Link>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default TransactionUser;
