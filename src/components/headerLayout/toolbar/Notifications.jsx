import React, { useContext, useEffect, useRef, useState } from "react";
import { AccountContext } from "../../../context/AccountProvider";
import styled from "styled-components";
import {
  getAllMessages,
  updateMessage,
} from "../../../service/messageServices";
import { formatMessageDate, formatOrderedDate, formatTimeAmPm } from "../../../utils/DisplayFormatters";
import { CircularProgress } from "@mui/material";
import { sleep } from "../../../utils/utils";



  
  const NotificationContainer = styled.div`
    max-width: 400px;
    margin: 20px auto;
    background-color: #fff;
    border-radius: 8px;
    overflow-y: auto;
    max-height: 300px;
  `;
  
  
  const MessageBox = styled.div`
    margin: 20px 10px;
    padding: 10px;
    background-color: ${({ unseen }) => (unseen ? "#e6f7ff" : "inherit")};
    border-radius: 8px;
    position: relative;
    transition: background-color 0.3s ease;
    display: flex;
    border: 1px solid #e6f7ff;
    flex-direction: column;
    align-items: flex-start;

    --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  
    &:hover {
      background-color: ${({ unseen }) => (unseen ? "#cfeeff" : "inherit")};
      cursor: pointer;
    }
  `;
  
  const MessageContent = styled.div`
    display: flex;
    justify-content: start;
    padding-bottom: 4px;
    align-items: center;
  `;
  
  const Dot = styled.div`
    width: 8px;
    height: 8px;
    background-color: red; /* Change the color as needed */
    border-radius: 50%;
    margin-right: 8px;
  `;
  
  const MessageText = styled.span`
    flex: 1; /* Takes up remaining space */
  `;
  
  const Timestamp = styled.span`
    font-size: 12px;
    color: #999;
    align-self: flex-end;
  `;

  const DateBox = styled.div`
   background-color: #e6f7ff;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    padding: 5px 15px;
    font-size: 12px;
    marign: 10px auto;
    --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    `;


  const DateDivider = styled.div`
    text-align: center;
    display: flex;
    justify-content: center;
    margin: 25px auto;
    color: #999;
  `;

  const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 20px;
  z-index: 1000;
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
`;

const PopupContent = styled.div`
  /* Styles for the detailed message content */
`;
  

const Notifications = ({ open }) => {
    let displayedDate = null;
  const { socketRef } = useContext(AccountContext);
  const [notifications, setNotifications] = useState({});
  const notificationCntrRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [messageSeen, setMessageSeen] = useState([]);
  const [messageUnseen, setMessageUnseen] = useState([]);
  const [page, setPage] = useState(0);
//   const [displayedDate, setDisplayedDate] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);

 

  useEffect(() => {
    fetchUnseenNotifications();
  }, []);


  useEffect(() => {
    const container = notificationCntrRef?.current;

    const handleScroll = async () => {
      const { scrollTop, clientHeight, scrollHeight } = container;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setLoading(true);
        await sleep(1000);
         await fetchMoreUnseenNotifications();
            setLoading(false);
      }
    };

    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, [notifications]);

  useEffect(() => {
    console.log(messageUnseen)
      const markNotificationAsSeen = async (notificationId) => {
        console.log(open);
      const messageId = notificationId.map((notification) => notification.notificationId);
      await updateMessage(messageId);
    };
    if (messageUnseen.length > 0 && open) markNotificationAsSeen(messageUnseen);
  }, [open, messageUnseen]);

  const handleMessageBoxClick = (message) => {
    var timerId
    setSelectedMessage(message);
    clearTimeout(timerId);
    setPopupVisible(true);
    timerId = setTimeout(() => {
        setPopupVisible(pref => !pref);
        }, 5000);
  };

  const fetchUnseenNotifications = async () => {
    const response = await getAllMessages();
    const data = response;
    const { unseen, seen } = filterSeenAndUnseenNotifications(data.messages);
    setMessageUnseen(unseen);
    setMessageSeen(seen);
    setNotifications(data);
    setPage(page + 1);
  };


  const fetchMoreUnseenNotifications = async () => {
    const response = await getAllMessages(page);
    const data = response;
    const { unseen, seen } = filterSeenAndUnseenNotifications(data.messages);
    setMessageUnseen((prevUnseen) => [...new Set([...prevUnseen, ...unseen])]);
    setMessageSeen((prevSeen) => [...new Set([...prevSeen, ...seen])]);

    setNotifications((prevNotifications) => {
        let arr = [...prevNotifications.messages, ...data.messages];
        const uniqueArray = arr.filter((thing, index) => {
            const _thing = JSON.stringify(thing);
            return (
              index ===
              arr.findIndex((obj) => {
                return JSON.stringify(obj) === _thing;
              })
            );
          });
        return { ...prevNotifications, messages: uniqueArray,unseen:data.unseen };
    });

    setPage(page + 1);
  };

  const filterSeenAndUnseenNotifications = (notifications) => {

    const seen = [];
    const unseen = [];
    notifications?.forEach((notification) => {
      if (notification?.status === "UNSEEN" || notification?.status === "SENT") {
        unseen.push(notification);
      } else {
        seen.push(notification);
      }
    });
    return { seen, unseen };
  };




  return (
  notifications?.messages?.length > 0 ? (
    <div>
     <NotificationContainer ref={notificationCntrRef}>
      {notifications.messages?.map((message, index) => {
        const currentDate = formatMessageDate(message.createdAt);
        const showMessageDate = currentDate !== displayedDate;
        displayedDate = currentDate;

        return (
          <React.Fragment key={index}>
            {showMessageDate && (
              <DateDivider>
                <DateBox>

                {formatMessageDate(message.createdAt) }
                </DateBox>
              </DateDivider>
            )}
            <MessageBox
              unseen={message.status === "UNSEEN" || message.status === "SENT"}
              onClick={() => handleMessageBoxClick(message)} 
            >
              <MessageContent>
                {message.status === "UNSEEN" || message.status === "SENT" && <Dot />}
                <MessageText>{message.message}</MessageText>
              </MessageContent>
              <Timestamp>{formatTimeAmPm(message.createdAt)}</Timestamp>
            </MessageBox>
          </React.Fragment>
        );
      })}
      {
        loading &&
          <CircularProgress/>

      }
    </NotificationContainer>

      <PopupContainer isVisible={isPopupVisible} >
        <PopupContent>
          {/* Display detailed message content here */}
          {selectedMessage && (
            <div>
              <p>{selectedMessage.message}</p>
              <p>{selectedMessage.createdAt}</p>
              {/* Add more details as needed */}
            </div>
          )}
        </PopupContent>
      </PopupContainer>
    </div>
  ) : (
    <span>No Notification</span>
  )
    );
};

export default Notifications;
