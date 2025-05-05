const getDatesOfCurrentWeek = (whichWeek) => {
  const today = new Date();
  const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()+whichWeek));
  const weekDates = [];

  for (let i = 0; i < 7; i++) {
    const day = new Date(firstDayOfWeek);
    day.setDate(firstDayOfWeek.getDate() + i);
  const day1 = day.toLocaleDateString("en-US", { weekday: "short" }); // e.g., "Monday"
  //const month = day.toLocaleDateString("en-US", { month: "short" }); // e.g., "April"
  const date = day.getDate(); // e.g., 5
    //weekDates.push(day.toDateString()+" "); // Format the date as needed
  //weekDates.push(`{day1} :{mo}`)
  weekDates.push(`${day1} ${date}`);

  }

  return weekDates;
};

export default getDatesOfCurrentWeek;