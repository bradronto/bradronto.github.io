const getMonth = () => {
    const today = new Date();
    const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()-6));
    const lastDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()+6));
  
    return(
      firstDayOfWeek.toLocaleDateString("en-us",{month: "short" }  )+" "+
      firstDayOfWeek.toLocaleDateString("en-us",{day: "numeric"})+" - "+
      lastDayOfWeek.toLocaleDateString("en-us",{month: "short"})+" "+
      lastDayOfWeek.toLocaleDateString("en-us",{day: "numeric"})+" " 
    );
   
  }

export default getMonth;