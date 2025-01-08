import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Add, Close } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#FFDFDF",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  position: "relative", // Added to enable positioning of the close button
};

export default function BasicModal({
  title,
  content,
  open,
  setOpen,
  modifyButton,
  modifyButtonIcon,
}) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="primary"
        startIcon={modifyButtonIcon ? modifyButtonIcon : <Add />}
      >
        {modifyButton ? modifyButton : `Create ${title}`}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* Close button */}
          <Button
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              padding: "8px",
              minWidth: "auto",
              height: "auto",
              color: "#000",
            }}
            size="small"
          >
            <Close />
          </Button>

          {/* Modal content */}
          {content}
        </Box>
      </Modal>
    </div>
  );
}
