import React, { useContext, useEffect, useState } from 'react'
import { addCardItem, deleteCardItem, getAllCards, getCardById, setDefaultCard, updateCardItem } from '../service/CustomerServices/CardServices';
import { AccountContext } from '../context/AccountProvider';

const useCard = () => {
    const [cards, setCards] = useState([]);
    const [loading,setLoading] = useState(false);
    const {account} = useContext(AccountContext)
    useEffect(() => {
      fetchAllCards();
    }, []); 
    console.log("cards", cards)
    const fetchAllCards = async () => {
      if(!account)return
      const data = await getAllCards();
      setCards(data);
    };

    const getAllCardsList = () => {
      return cards;
    }
  
    const updateItem = async (request) => {
      if(loading)return
      setLoading(true)
      await updateCardItem(request);
      await fetchAllCards(); // Update cards after updating item
      setLoading(false)
    };
  
    const deleteItem = async (cardId) => {
      if(loading)return
      setLoading(true)
      await deleteCardItem(cardId);
      await fetchAllCards(); // Update cards after deleting item
      setLoading(false)
    };
  
    const addItem = async (request) => {
      if(loading)return
      setLoading(true)
      await addCardItem(request);
      await fetchAllCards(); // Update cards after adding item
      setLoading(false)
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
      getAllCardsList
    };
  };
  
  export default useCard;