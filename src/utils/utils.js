export const sleep = async (ms) =>{return new Promise(resolve => setTimeout(resolve, ms))}

export const char0ToUpper = (str) => {
    return str?.charAt(0).toLocaleUpperCase() + str?.slice(1);
}

// Function to get the stock status message
export const getStockStatusMessage = (stockCount) => {
    if (stockCount > 20) {
      return 'In Stock';
    } else if (stockCount > 10) {
      return 'Few Left';
    } else if (stockCount > 0) {
      return `Only ${stockCount} Left`;
    } else {
      return 'Out of Stock';
    }
  };
  
  // Function to get the stock status color class
  export const getStockStatusColor = (stockCount) => {
    if (stockCount > 20) {
      return 'text-green-500'; // Green color
    } else if (stockCount > 10) {
      return 'text-yellow-500'; // Yellow color
    } else if (stockCount > 0) {
      return 'text-red-500'; // Red color
    } else {
      return 'text-gray-500'; // Gray color
    }
  };

  export const formatNumber = (num) => {
    if (num < 1000) {
      return num.toString();
    } else if (num >= 1000 && num < 1000000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    } else if (num >= 1000000 && num < 10000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else {
      return (num / 1000000).toFixed(0) + 'M';
    }
  };