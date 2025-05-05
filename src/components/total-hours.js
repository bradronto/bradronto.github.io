

const calculateTotalHours = (start, end) => 
    {
    const [start12, startPeriod] = start.split(" ");
    const[end12,endPeriod] = end.split(" ");
    const [startHour, startMinute] = start12.split(":").map(Number);
    const start24 = startPeriod === "AM" ? startHour : (startHour>11?startHour:startHour + 12) ;
    const [endHour, endMinute] = end12.split(":").map(Number);
    const end24 = endPeriod === "AM"?endHour:(endHour>11?endHour:endHour+12);
    return (end24 + endMinute / 60) - (start24 + startMinute / 60);
  };

  export default calculateTotalHours;