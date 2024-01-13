// useAddresses.js - Custom hook for address-related API operations
import { useContext, useEffect, useState } from 'react'; 
import { addAddress, deleteAddress, getAddress, getAllAddresses, updateAddress } from '../service/CustomerServices/addressServices';
import { AccountContext } from '../context/AccountProvider';

const useAddresses = () => {
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const {account} = useContext(AccountContext)


  useEffect(() => {
    getAllAddress();
  }, []);

  const getAllAddress = async () => {
    if(!account)return
    setLoading(true);

    const data = await getAllAddresses();
    setAddresses(data);
    setLoading(false);
  };

  const deleteAddresses = async (identifier) => {
    setLoading(true);
    await deleteAddress(identifier);
    await getAllAddress(); // Refresh addresses after deletion
    setLoading(false);
  };

  const addAddresses = async (address) => {
    setLoading(true);
    await addAddress(address);
    await getAllAddress(); // Refresh addresses after addition
    setLoading(false);
  };

  const updateAddresses = async (identifier, address) => {
    setLoading(true);
    await updateAddress(identifier, address);
    await getAllAddress(); // Refresh addresses after update
    setLoading(false);
  };

  const getAddresses = async (identifier) => {
    setLoading(true);
    const data = await getAddress(identifier);
    setLoading(false);
    return data;
  };

  // Return the functions, addresses, and loading state for use in components
  return {
    getAllAddress,
    deleteAddresses,
    addAddresses,
    updateAddresses,
    getAddresses,
    addresses,
    loading,
  };
};

export default useAddresses;
