import React, { useEffect, useState } from 'react';

import {

    deleteMessage,
    deleteAllMessages,
    getAllMessages,
    updateMessage
} from '../service/messageServices';

const useMessage = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAllMessages();
    }, []);

    const fetchAllMessages = async () => {
        const data = await getAllMessages();
        setMessages(data);
    };

    const updateItem = async (request) => {
        if (loading) return;
        setLoading(true);
        await updateMessage(request);
        await fetchAllMessages(); 
        setLoading(false);
    };

    const deleteItem = async (identifier) => {
        if (loading) return;
        setLoading(true);
        await deleteMessage(identifier);
        await fetchAllMessages();
        setLoading(false);
    };

    const deleteAll = async () => {
        if (loading) return;
        setLoading(true);
        await deleteAllMessages();
        await fetchAllMessages();
        setLoading(false);
    };

 

    return {
        messages,
        fetchAllMessages,
        updateItem,
        deleteItem,
        deleteAll,
        loading
    };
};

export default useMessage;
