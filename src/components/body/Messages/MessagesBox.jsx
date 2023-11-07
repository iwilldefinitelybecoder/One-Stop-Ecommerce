import React, { useEffect, useState } from 'react';
import './messages.css';

const MessagesBox = ({ newMessage }) => {
  const [messagesQueue, setMessagesQueue] = useState([]);
  const [messageToShow, setMessageToShow] = useState(null);
  // Add new messages to the queue when newMessage prop changes
  useEffect(() => {
    if (newMessage) {
      setMessagesQueue((prevQueue) => [...prevQueue, newMessage]);
    }
  }, [newMessage]);;

  
  useEffect(() => {
    const displayNextMessage = () => {
      if (messagesQueue.length > 0) {
        // Show the next message and remove it from the queue
        const nextMessage = messagesQueue[0];
        setMessageToShow(nextMessage);
        console.log(nextMessage);

        // Remove the displayed message from the queue
        setMessagesQueue((prevQueue) => prevQueue.slice(1));
      }
    };

    
    displayNextMessage();


    const timerId = setInterval(() => {
      displayNextMessage();
    }, 7000);

    return () => clearInterval(timerId);
  }, [messagesQueue]);

  // Close the displayed message
  const handleCloseMessage = () => {
    setMessageToShow(null);
  };

  return (
    messageToShow && (
    <div className="message-main-cntr">
        <div className='message-cntr'>
          <div className='message-box bg-light-pink'>
            <span className='text-white'>{messageToShow}</span>
            <div className='message-close-btn text-white' onClick={handleCloseMessage}>
              x
            </div>
          </div>
        </div>
    </div>
      )
  );
};

export default MessagesBox;
