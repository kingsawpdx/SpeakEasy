import "./App.css";
import Homepage from "./Homepage";
import Header from "./Header";


function App() {
  const [text, setText] = useState(""); //store the text for speech
  const [playAudio, setPlayAudio] = useState(false); //control speech playback

  // Function to trigger speech playback //maybe pass to header 
  const playHeader = () => {
    setPlayAudio(true);
  };

  // Function to clear the text //maybe pass to header as well 
  const clearHeader = () => {
    setText("");
  };

  return (
    <>
    <Header 
        text={text} 
        playHeader={playHeader} 
        clearHeader={clearHeader} 
      />
      <Homepage />
    </>
  );
}

export default App;