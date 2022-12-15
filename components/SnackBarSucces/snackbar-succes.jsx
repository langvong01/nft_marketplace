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
      vertical: vertical,
      horizontal: horizontal,
      message: message,
    });
    
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={1000}
      anchorOrigin={{ vertical, horizontal }}
      onClose={handleClose}
      key={vertical + horizontal}
      sx={{
        borderRadius: '8px',
        zIndex: '111111111111111111',
      }}
    >
      <Alert
        severity="success"
        sx={{
          width: '300px',
          padding: '24px',
          textAlign: 'center',
          fontSize: '1.2rem',
          bgcolor: 'white',
          color: '#4c5773',
          ' & .css-1ytlwq5-MuiAlert-icon': {
            color: 'green',
          },
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBarSuccess;
