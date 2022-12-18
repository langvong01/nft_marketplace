import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const BackDrop = ({ openBackDrop }) => {
  return (
    <div className="z-[1111111111111111111111111111133111]">
      <Backdrop
        sx={{ color: '#fff', zIndex: '1111111111111111111111111' }}
        open={openBackDrop}
      >
        <div className="w-100 text-center">
          <p>Please wait a second</p>
          <CircularProgress color="inherit" />
        </div>
      </Backdrop>
    </div>
  );
};

export default BackDrop;
