import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackBarSuccess = ({ open, vertical, horizontal, message, setToast }) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setToast({
      open: false,
      vertical: 'bottom',
      horizontal: 'center',
    });
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={1000}
      onClose={handleClose}
      anchorOrigin={{ vertical, horizontal }}
      key={vertical + horizontal}
    >
      <Alert
        severity="success"
        sx={{
          width: '100%',
          bgcolor: '#4c5773'
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBarSuccess;
