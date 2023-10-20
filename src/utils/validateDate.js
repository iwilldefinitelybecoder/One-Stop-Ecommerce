export const isValidExpiryDate = (expiryDate) => {
    // Check if the input is in the format MM/YY
    const datePattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
  
    if (!datePattern.test(expiryDate)) {
      return false; // Invalid format
    }
  
    const [month, year] = expiryDate.split('/').map(Number);
    const currentYear = new Date().getFullYear() % 100; // Get the last two digits of the current year
    const currentMonth = new Date().getMonth() + 1; // Months are zero-based, so add 1
  
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return false; // Card is expired
    }
  
    return true; // Valid expiry date
  }
  
  // Example usage:
