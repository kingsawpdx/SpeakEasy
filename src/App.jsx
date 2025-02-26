import { useEffect, useState } from 'react';
import './App.css';
import FetchFromApi from './components/FetchData';

function App() {
  const [words, setWords] = useState([]);
  const pictogramIds = [2349, 2350, 2351, 2352, 2356, 2588, 2599, 2511]; // Example pictogram IDs

  useEffect(() => {
    fetch('http://localhost:3000/words')
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
      <div>
        <h2>ARASAAC Fetching Data</h2>
        <FetchFromApi pictogramIds={pictogramIds} />
      </div>
    </>
  );
}

export default App;
