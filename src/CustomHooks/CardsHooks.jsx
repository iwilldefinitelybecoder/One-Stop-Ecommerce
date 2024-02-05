import React, { useContext, useEffect, useState } from 'react'
import { addCardItem, deleteCardItem, getAllCards, getCardById, setDefaultCard, updateCardItem } from '../service/CustomerServices/CardServices';
import { AccountContext } from '../context/AccountProvider';
import Cookies from 'js-cookie';

const useCard = () => {
  const cookies = Cookies.get('JWT');
    const [cards, setCards] = useState([]);
    const [loading,setLoading] = useState(false);
    const {account} = useContext(AccountContext)
    useEffect(() => {
      fetchAllCards();
    }, []); 
    
    const fetchAllCards = async () => {
      if(!account)return
      const data = await getAllCards();
      setCards(data);
    };

    const fetchAllCardsList = async () =>{
      if(loading)return
      setLoading(true)
      const resposne =  await getAllCards();
      setLoading(false)
      setCards(resposne);
    }

    const getAllCardsList = () => {
      return cards;
    }
  
    const updateItem = async (request) => {
      if(loading)return
      setLoading(true)
      const response = await updateCardItem(request);
      await fetchAllCards(); // Update cards after updating item
      setLoading(false)
      return response;
    };
  
    const deleteItem = async (cardId) => {
      if(loading)return
      setLoading(true)
      const response= await deleteCardItem(cardId);
      await fetchAllCards(); // Update cards after deleting item
      setLoading(false)
      return response;
    };
  
    const addItem = async (request) => {
      if(loading)return
      setLoading(true)
     const response =  await addCardItem(request);
      await fetchAllCards(); // Update cards after adding item
      setLoading(false)
      return response;
    };
  
    const setDefault = async (cardId) => {
      if(loading)return
      setLoading(true)
      await setDefaultCard(cardId);
      await fetchAllCards(); // Update cards after setting default
      setLoading(false)
    };
  
    const getCard = async (cardId) => {
     
      return await getCardById(cardId);
      
    };
  
    return {
      cards,
      fetchAllCards,
      updateItem,
      deleteItem,
      addItem,
      setDefault,
      getCard,
      loading,
      getAllCardsList,
      fetchAllCardsList,
    };
  };
  
  export default useCard;