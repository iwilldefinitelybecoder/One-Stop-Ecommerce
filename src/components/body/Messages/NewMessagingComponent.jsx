import React, { useState, useEffect } from 'react';
import { Snackbar, Slide, Alert } from '@mui/material';

const useMessageHandler = () => {
  const [messageQueue, setMessageQueue] = useState([]);
  const [displayedMessages, setDisplayedMessages] = useState([]);

  useEffect(() => {
    const showNextMessage = () => {
      if (messageQueue.length > 0 && displayedMessages.length < 10) {
        setDisplayedMessages((prevMessages) => [
          ...prevMessages,
          messageQueue[0],
        ]);
        setMessageQueue((prevQueue) => prevQueue.slice(1));
      }
    };

    showNextMessage();
  }, [messageQueue, displayedMessages]);

  const handleClose = (index, event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setDisplayedMessages((prevMessages) =>
      prevMessages.filter((message, i) => i !== index)
    );
  };

  const handleMessage = (message, type = 'info') => {
    setMessageQueue((prevQueue) => [...prevQueue, { message, type }]);
  };

  const getMessageComponents = () => {
    return displayedMessages.map((msg, index) => (
      <Snackbar
        key={index}
        open={true}
        autoHideDuration={6000}
        onClose={(event, reason) => handleClose(index, event, reason)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        TransitionComponent={Slide}
        style={{ marginBottom: '30px',bottom:`${index*70}px`,marginTop:'30px',borderRadius:'8px'}}
        
        TransitionProps={{ direction: 'up' }}
      >
        <Alert onClose={() => handleClose(index)} severity={msg.type}>
          {msg.message}
        </Alert>
      </Snackbar>
    ));
  };

  return { handleMessage, getMessageComponents };
};

export default useMessageHandler;
