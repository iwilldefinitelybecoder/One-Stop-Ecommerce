import React, { useState } from 'react';


const ReviewFacet = () => {
  const [shippingOption, setShippingOption] = useState('');
  const [eta, setETA] = useState('');

  const handleShippingOptionChange = (option) => {
    setShippingOption(option);
  };

  const handleETACheck = (isChecked) => {
    setETA(isChecked ? 'Express' : '');
  };

  const handleSubmit = () => {
    console.log('Shipping Option:', shippingOption);
    console.log('ETA Preference:', eta);
    // Add your logic to save preferences or proceed with the next steps
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-lg">
      <h1 className="text-2xl font-semibold mb-6">Shipping Preferences</h1>

      <div className="mb-4">
        <label className="flex items-center mb-2">
          <input
            type="radio"
            value="standard"
            checked={shippingOption === 'standard'}
            onChange={() => handleShippingOptionChange('standard')}
            className="mr-2"
          />
          Standard Shipping
        </label>

        <label className="flex items-center">
          <input
            type="radio"
            value="express"
            checked={shippingOption === 'express'}
            onChange={() => handleShippingOptionChange('express')}
            className="mr-2"
          />
          Express Shipping
        </label>
      </div>

      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={eta === 'Express'}
            onChange={(e) => handleETACheck(e.target.checked)}
            className="mr-2"
          />
          I prefer Express Delivery (ETA: 2 days)
        </label>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Save Preferences
      </button>
    </div>
  );
};




export default ReviewFacet;
