import React, { useEffect, useState } from 'react'
import { addCardItem, deleteCardItem, getAllCards, getCardById, setDefaultCard, updateCardItem } from '../service/CustomerServices/CardServices';

const useCard = () => {
    const [cards, setCards] = useState([]);
    const [loading,setLoading] = useState(false);
  
    useEffect(() => {
      fetchAllCards();
    }, []); 
  
    const fetchAllCards = async () => {
      const data = await getAllCards();
      setCards(data);
    };
  
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
      loading
    };
  };
  
  export default useCard;