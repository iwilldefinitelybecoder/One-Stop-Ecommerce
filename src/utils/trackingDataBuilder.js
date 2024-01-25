export function constructDataFromList(updatesList) {
    const data = {};
  
    updatesList?.forEach(update => {
      const { timestamp, place, action } = update;
      const dateKey = formatDate(timestamp);
  
      if (!data[dateKey]) {
        data[dateKey] = [];
      }
  
      data[dateKey].push({
        time: formatTime(timestamp),
        place,
        action,
      });
    });
  
    return data;
  }
  
  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  function formatTime(timestamp) {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const period = hours < 12 ? 'AM' : 'PM';
    const formattedHours = hours % 12 === 0 ? '12' : (hours % 12).toString().padStart(2, '0');
    return `${formattedHours}:${minutes} ${period}`;
  }
  
  
  