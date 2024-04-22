import { TableCell } from "@mui/material";

// eslint-disable-next-line react/prop-types
const TransactionCell = ({ date }) => {
  const parsedDate = new Date(date);
  
  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}/${month}/${day}`;

  return <TableCell>{formattedDate}</TableCell>;
};

export default TransactionCell;
