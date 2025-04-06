import React, { useState } from "react";
import "./styles/cool.css"

const SelectWithNewItem = ({myArray}) => {
  const myArray1 = ["Lake Mariner", "Option 2", "Option 3"];
  //const [options, setOptions] = useState(["Option 1", "Option 2", "Option 3"]); // Initial options
  const [options, setOptions] = useState(myArray); // Initial options
  const [selectedOption, setSelectedOption] = useState(""); // State for selected option
  const [showInputPopup, setShowInputPopup] = useState(false); // State for pop-up visibility
  const [newOption, setNewOption] = useState(""); // State for new option input
 // const [showInput, setShowInput] = useState(false);

  const handleSelectChange = (event) => {
    const value = event.target.value;
    if (value === "New Item") {
      setShowInputPopup(true); // Show the pop-up when "New Item" is selected
    } else {
      setSelectedOption(value); // Update selected option
    }
  };

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      setShowInputPopup(false); // Hide the input box
      //console.log("Input Value:", inputValue); // Log the input value (optional)
      if (newOption.trim() && !options.includes(newOption)) {
        setOptions([...options, newOption]); // Add the new item to the options list
        setSelectedOption(newOption); // Set the new item as the selected option
      }
      setNewOption(""); // Clear the input field
    
    }
 
  };

  const handleAddOption = () => {
    if (newOption.trim() && !options.includes(newOption)) {
      setOptions([...options, newOption]); // Add the new item to the options list
      setSelectedOption(newOption); // Set the new item as the selected option
    }
    setNewOption(""); // Clear the input field
    setShowInputPopup(false); // Hide the pop-up
  };

  return (
    <div>
      <select className="cool-input" value={selectedOption} onChange={handleSelectChange}>
       
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
        <option value="New Item">New Job</option>
      </select>

      {/* Pop-up Input */}
      {showInputPopup && (
        <div  >
          <input className="cool-pop-up"
            type="text"
            onChange={(e) => setNewOption(e.target.value)}
            // onSubmit={handleAddOption}
            placeholder="new job name"
            onKeyDown={handleEnterPress}
            autoFocus
          />
        </div>
      )}

     
    </div>
  );
};

export default SelectWithNewItem;


/*

          <button onClick={handleAddOption}>Add</button>
          <button onClick={() => setShowInputPopup(false)}>Cancel</button>

 <div style={{ marginTop: "20px" }}>
        <p>{selectedOption || "None selected"}</p>
      </div>

*/