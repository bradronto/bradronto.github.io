const getRaw = () => {



const textRef = useRef();
const [rawText, setRawText] = useState("wtf");

const setraw = () => {
 const rawHTML = textRef.current.innerHTML;
 const convertedText = rawHTML
 .replace(/<\/?(span|div)[^>]*>/gi, "") // Matches opening or closing <span> and <div> tags
 .replace(/\.\s*\./g, "") // Remove consecutive dots if any
 .replace(/<br\s*\/?>/gi, "\n")
 .replace(/&nbsp;/g, "");
 setRawText(convertedText);
}


}