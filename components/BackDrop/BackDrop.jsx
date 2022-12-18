import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const BackDrop = ({openBackDrop}) => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={openBackDrop}
    >
      <div className="w-100 text-center">
        <p>Please wait a second</p>
        <CircularProgress color="inherit" />
      </div>
    </Backdrop>
  );
};

export default BackDrop;
