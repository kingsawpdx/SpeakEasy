import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./Header";
import TextToSpeech from "./Components/TextToSpeech";

const CategoryPage = () => {
  const location = useLocation();
  const { categoryId } = useParams();

  const [text, setText] = useState("");

  const [play, setPlay] = useState(false);
  const [input, setInput] = useState("");
  // const [settings, setSettings] = useState(false);

  const words = location.state?.words || [];

  const filteredWords = words.filter((word) => word.category == categoryId);

  const handlePlay = (word) => {
    setText(text + " " + word);
    setInput(word);
    setPlay(true);
  };

  const clearHeader = () => {
    setText("");
  };

  const playHeader = () => {
    setInput(text);
    setPlay(true);
  };

  // const changeSettings = () => {
  //   setSettings(!settings);
  // };

  useEffect(() => {
    setPlay(false);
  }, [play]);

  return (
    <div className="word-list-container">
      <Header
        text={text}
        clearHeader={() => clearHeader()}
        playHeader={() => playHeader()}
      />

      <ul className="word-list">
        {filteredWords.map((word) => (
          <li key={word.id} style={{ borderRadius: "10px" }}>
            <button
              className="word-button"
              onClick={() => handlePlay(word.word)}
            >
              {word.image && (
                <img
                  className="mb-3"
                  style={{
                    height: "100px",
                    objectFit: "contain",
                  }}
                  src={word.image}
                  alt={word.word}
                />
              )}
              <p>{word.word}</p>
            </button>
          </li>
        ))}
      </ul>
      <TextToSpeech data={input} playAudio={play} />
    </div>
  );
};

export default CategoryPage;
