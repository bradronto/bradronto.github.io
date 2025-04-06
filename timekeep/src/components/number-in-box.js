const NumberInBox = props => {
    const [day,date] = props.day.split("   ")
    return (
      <div style={{
        marginTop: "0px",
        display: "inline-block",
        padding: "2px",
        border: "2px solid #000000",
        //borderColor: "black",
        //borderWidth: "4px",
        borderRadius: "8px",
        textAlign: "center",
        height: "45px",
        width: "45px",
        fontSize: "17px",
        backgroundColor:"rgb(252, 247, 174)" ,
        color: "black"
      }}>
        {day} <br />{date}
      </div>
    );
  };

  export default NumberInBox;