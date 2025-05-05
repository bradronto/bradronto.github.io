const generateTimeOptions = () => {
    
    const times = [];
    const start = new Date();
    start.setHours(0, 0, 0, 0); // Set to 12:00 AM
    const end = new Date();
    end.setHours(23, 30, 0, 0); // Set to 11:30 PM
  
    while (start <= end) {
      const hours = start.getHours();
      const minutes = start.getMinutes();
      const period = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12; // Convert 24-hour time to 12-hour time
      //const formattedHours = hours;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
      times.push(`${formattedHours}:${formattedMinutes} ${period}`);
      start.setMinutes(start.getMinutes() + 30); // Increment by 30 minutes
    }
  
    return times;
  };

  export default generateTimeOptions;