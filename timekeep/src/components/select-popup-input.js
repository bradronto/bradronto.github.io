import React, { useState } from "react";
import "./styles/cool.css"

const SelectWithNewItem = ({jobsArray,setJobsArray}) => {
  const [options, setOptions] = useState(jobsArray); // Initial options
  const [selectedOption, setSelectedOption] = useState(""); // State for selected option
  const [showInputPopup, setShowInputPopup] = useState(false); // State for pop-up visibility
  const [newOption, setNewOption] = useState(""); // State for new option input
 
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
      //console.log("Input Value:", inputValue); // Log the input value (optional)
      if (newOption.trim() && !options.includes(newOption)) {
        setOptions([...options, newOption]); // Add the new item to the options list
        //setJobsArray([...jobsArray, newOption]);
        setJobsArray((prev) => [...prev, newOption]);
        setSelectedOption(newOption); // Set the new item as the selected option
      }
      setNewOption(""); // Clear the input field
      setShowInputPopup(false); // Hide the input box
      console.log("jobs",jobsArray,options,newOption)
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
