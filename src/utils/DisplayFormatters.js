export function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
  
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
  
    return `${day}/${month}/${year}`;
  }

  export function getDateRange() {
    const today = new Date();
    const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
  
    const formatDate = date => {
      const dd = String(date.getDate()).padStart(2, '0');
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const yyyy = date.getFullYear().toString().slice(-2);
      return `${dd}/${mm}/${yyyy}`;
    };
  
    const formattedToday = formatDate(today);
    const formattedOneWeekAgo = formatDate(oneWeekAgo);
  
    return `${formattedOneWeekAgo} to ${formattedToday}`;
  }

  export function formatOrderedDate(timestamp) {
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

export function truncateString(str, maxLength) {
  if (str.length > maxLength) {
    return str.substring(0, maxLength - 3) + '...';
  }
  return str;
}


export function formatTimeAmPm(timestamp) {
  const date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';

  // Convert hours to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 should be converted to 12

  // Add leading zero to minutes if needed
  minutes = minutes < 10 ? '0' + minutes : minutes;

  const formattedTime = `${hours}:${minutes} ${ampm}`;
  return formattedTime;
}

export function formatMessageDate(timestamp) {
  const currentDate = new Date();
  const orderedDate = new Date(timestamp);

  // Check if the timestamp is from the same day
  if (
    orderedDate.getDate() === currentDate.getDate() &&
    orderedDate.getMonth() === currentDate.getMonth() &&
    orderedDate.getFullYear() === currentDate.getFullYear()
  ) {
    return 'Today';
  }

  // Calculate the difference in days
  const differenceInDays = Math.floor((currentDate - orderedDate) / (24 * 60 * 60 * 1000));

  if (differenceInDays <= 7) {
    // Return the day of the week for timestamps within the last week
    const options = { weekday: 'long' };
    return new Intl.DateTimeFormat('en-US', options).format(orderedDate);
  } else {
    // Return the usual formatting for older timestamps
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(orderedDate);
  }
}



