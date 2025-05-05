const getMonth = (whichWeek) => {
    const today = new Date();
    const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()+whichWeek));
    const lastDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()+7));
  
    return(
      firstDayOfWeek.toLocaleDateString("en-us",{month: "short" }  )+" "+
      firstDayOfWeek.toLocaleDateString("en-us",{day: "numeric"})+" - "+
      lastDayOfWeek.toLocaleDateString("en-us",{month: "short"})+" "+
      lastDayOfWeek.toLocaleDateString("en-us",{day: "numeric"})+"  " 
     // + lastDayOfWeek.toLocaleDateString("en-us",{year: "numeric"})+" " 
    );
   
  }

export default getMonth;