import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const ConfirmationDialog = ({ message }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      setOpen(true);
      e.preventDefault();
      e.returnValue = ''; // This empty string disables the default browser alert
    };

    const handlePopstate = () => {
      setOpen(true);
      window.history.pushState(null, '', window.location.href);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} >
      <DialogTitle>Confirm Leaving</DialogTitle>
      <DialogContent>
        <p>{message}</p>
      </DialogContent>
      <DialogActions className='space-x-5'>
        <Button onClick={handleClose} variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button onClick={handleClose} variant="contained" color="primary">
          Leave
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
