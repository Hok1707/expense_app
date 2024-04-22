import { Modal, Typography, Button } from "@mui/material";

// eslint-disable-next-line react/prop-types
const ErrorModal = ({ open, handleClose, errorMessage }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          width: "300px",
          height: "250px",
          border: "2px solid red",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Typography variant="h5" style={{ color: "red" }}>
            Error Message
          </Typography>
          <Typography variant="body1" style={{ color: "red", marginTop: "20px" }}>
            {errorMessage}
          </Typography>
        </div>
        <Button onClick={handleClose} variant="contained" color="primary" style={{ marginBottom: "20px" }}>
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default ErrorModal;
