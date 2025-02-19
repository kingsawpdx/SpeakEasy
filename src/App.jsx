import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [words, setWords] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/words")
      .then((res) => res.json())
      .then((data) => setWords(data))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <h1>SpeakEasy</h1>
      <ul>
        {words.map((word, index) => (
          <li key={index}>{word.word}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
