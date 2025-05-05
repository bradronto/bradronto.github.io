import React, { useRef } from "react";

function StripHtml() {
  const htmlRef = useRef();

  const handleExtractText = () => {
    const htmlElement = htmlRef.current;
    const textContent = htmlElement.textContent; // Retrieves only the text part of the HTML
    console.log(textContent); // Logs: "This is the text part"
  };

  return (
    <div>
      <div ref={htmlRef}>
        This is the <b>text</b> part.
      </div>
      <button onClick={handleExtractText}>Extract Text</button>
    </div>
  );
}

export default App;
