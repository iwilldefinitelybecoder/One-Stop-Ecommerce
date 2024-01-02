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
