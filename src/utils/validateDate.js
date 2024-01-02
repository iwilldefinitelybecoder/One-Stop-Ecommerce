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

  export const  getTimeDifference = (postedDate) => {
    const currentDate = new Date();
    const datePosted = new Date(postedDate);
  
    const timeDifference = currentDate - datePosted;
  
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
  
    if (years > 0) {
      return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    } else if (months > 0) {
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else if (days > 0) {
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else if (hours > 0) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (minutes > 0) {
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else {
      return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
    }
  };
  
  

