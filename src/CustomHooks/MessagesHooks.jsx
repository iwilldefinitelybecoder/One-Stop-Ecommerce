import { useContext, useEffect, useState } from 'react';
import * as messageServices from '../path-to-your-message-services'; // Import your message services file
import { deleteAllMessages, deleteMessage, getAllMessages, updateMessage } from '../service/messageServices';
import { AccountContext } from '../context/AccountProvider';
import Cookies from 'js-cookie';

export const useMessages = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { account } = useContext(AccountContext);

  useEffect(() => {
    getAllMessagess();
  }
    , []);

  const getAllMessagess = async (page, size) => {
    if(!account)return
    setLoading(true);
    const response = await getAllMessages(page, size);
    setLoading(false);
    return response;
  };

  const deleteMessagee = async (identifier) => {
    setLoading(true);
    const response = await deleteMessage(identifier);
    setLoading(false);
    return response;
  };

  const deleteAllMessagess = async (userEmail) => {
    setLoading(true);
    const response = await deleteAllMessages(userEmail);
    setLoading(false);
    return response;
  };

  const updateMessagee = async (messageId) => {
    setLoading(true);
    const response = await updateMessage(messageId);
    setLoading(false);
    return response;
  };

  return {
    loading,
    error,
    getAllMessagess,
    deleteMessagee,
    deleteAllMessagess,
    updateMessagee,
  };
};
