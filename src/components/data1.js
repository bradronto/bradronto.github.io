import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
// import WorkHoursTracker from "../components/dates"
 const supabase = createClient("https://grsilsogurusppiuthls.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdyc2lsc29ndXJ1c3BwaXV0aGxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwMjYzNDksImV4cCI6MjA1ODYwMjM0OX0.DKpZpAZgQ6I8XlHZad4YvsT1c-vZUNYWKsT-GuxjsNs");

const UpdateInput = () => {
  const [jobName, setJobName] = useState("");
  const [rowId, setRowId] = useState(null); // Row ID to update (replace with actual ID)

  const handleRowChange = (value) => {
    setRowId(value);

   
  };
  const handleInputChange = async (value) => {
    setJobName(value);

    // Update the Supabase table on input change
    const { data, error } = await supabase
      .from("workhours") // Replace "workhours" with your table name
      .update({ jobname: value }) // Update the "jobname" column with the new value
      .eq("id", rowId); // Ensure you update the specific row by ID

    if (error) {
      console.error("Error updating row:", error.message);
    } else {
      console.log("Row updated successfully:", data);
    }
  };

  return (
    <div>
      <label htmlFor="jobname">Update Job Name:</label>
      <input
        type="text"
        id="jobname"
        value={jobName}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Enter job name"
      />
      <input
      type="numeric"
      id="id"
      value={rowId}
      onChange={(e) => handleRowChange(e.target.value)}
      placeholder="Enter id"
    />
    </div>
  );
};

export default UpdateInput;
