import { useEffect, useState } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import Header from './Header';
import TextToSpeech from './Components/TextToSpeech';
import SideBar from './SideBar';


const CategoryPage = () => {
  const { categoryId } = useParams();
  const location = useLocation();

  const [words] = useState(location.state?.words || []);
  const [category] = useState(location.state?.category || "");

  const [subcategories, setSubcategories] = useState([]);
  const [filteredWords, setFilteredWords] = useState([]);

  const [text, setText] = useState("");
  const [play, setPlay] = useState(false);
  const [input, setInput] = useState("");

  //toggle TTS settings visibility
  const [showTTS, setShowTTS] = useState(false);

  //TTS settings
  const [voice, setVoice] = useState(null);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);

  useEffect(() => {
    const subcategoryList = words.filter(
      (word) =>
        word.isCategory &&
        word.category == categoryId &&
        word.isCategoryId != categoryId
    );
    setSubcategories(subcategoryList);

    const wordList = words.filter(
      (word) => !word.isCategory && word.category == categoryId
    );
    setFilteredWords(wordList);
  }, [words, categoryId]);

 //new 
  const handlePlay = (word) => {
  setText((prevText) => `${prevText} ${word}`);
  speak(word);
};

// Function to trigger speech synthesis
const speak = (word) => {
  const speechSynthesis = window.speechSynthesis;
  const audio = new SpeechSynthesisUtterance(word);
  audio.voice = voice;
  audio.pitch = pitch;
  audio.rate = rate;
  speechSynthesis.speak(audio);
};

  const clearHeader = () => setText("");

  const playHeader = () => {
    if (text.trim()) {
      speak(text);
    }
  };

  useEffect(() => {
    if (play) setPlay(false);
  }, [play]);

  const toggleTTS = () => {
    setShowTTS((prev) => !prev);
  };

  return (
    <div className="container-fluid p-0 d-flex">
    {/* Sidebar */}
     <SideBar handlePlay={handlePlay} />

      <Header
        category={category}
        text={text}
        clearHeader={clearHeader}
        playHeader={playHeader}
        toggleTTS={toggleTTS}
      />

      <div className="category-main">
        <div className="row g-4 ">
          {/* Subcategories (with blue background) */}
          {subcategories.map((subcategory) => (
            <div
              key={subcategory.id}
              className="col-6 col-sm-4 col-md-3 col-lg-2"
            >
              <Link
                className="category-button text-center p-4"
                to={`/category/${subcategory.isCategoryId}`}
                state={{
                  words: words,
                  category: subcategory.word,
                }}
              >
                {subcategory.image && (
                  <img
                    src={subcategory.image}
                    alt={subcategory.word}
                    className="mb-3"
                    style={{ height: "100px", objectFit: "contain" }}
                  />
                )}
                <span>
                  {subcategory.word.charAt(0).toUpperCase() +
                    subcategory.word.slice(1)}
                </span>
              </Link>
            </div>
          ))}

          {/* Words (with light yellow background) */}
          {filteredWords.map((word) => (
            <div key={word.id} className="col-6 col-sm-4 col-md-3 col-lg-2">
              <button
                className="word-button d-block text-center"
                onClick={() => handlePlay(word.word)}
              >
                {word.image && (
                  <img
                    className="mb-3"
                    src={word.image}
                    alt={word.word}
                    style={{ height: "100px", objectFit: "contain" }}
                  />
                )}
                <p>{word.word}</p>
              </button>
            </div>
          ))}
        </div>
      </div>

      {showTTS && (
        <div
          className="tts-popup"
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
            zIndex: 1000,
          }}
        >
          <TextToSpeech
            data={input}
            playAudio={play}
            displaySettings={showTTS}
            changeSettings={() => setShowTTS(false)}
            voice={voice}
            setVoice={setVoice}
            pitch={pitch}
            setPitch={setPitch}
            rate={rate}
            setRate={setRate}
          />
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
