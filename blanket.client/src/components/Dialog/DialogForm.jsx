import React from "react";
import styles from "./Dialog.module.scss";
import {
  AppBar,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogForm({
  width = "sm",
  open,
  handleClose,
  title,
  children,
}) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        fullWidth
        maxWidth={width}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="close"
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={styles.form}>{children}</div>
      </Dialog>
    </React.Fragment>
  );
}
