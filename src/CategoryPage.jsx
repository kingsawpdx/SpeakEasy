import { useEffect, useState } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import Header from './Header';
import TextToSpeech from './Components/TextToSpeech';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const location = useLocation();

  const [words] = useState(location.state?.words || []);
  const [category] = useState(location.state?.category || '');

  const [subcategories, setSubcategories] = useState([]);
  const [filteredWords, setFilteredWords] = useState([]);

  const [text, setText] = useState('');
  const [play, setPlay] = useState(false);
  const [input, setInput] = useState('');

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

  const handlePlay = (word) => {
    setText((prevText) => `${prevText} ${word}`);
    setInput(word);
    setPlay(true);
  };

  const clearHeader = () => setText('');
  const playHeader = () => {
    setInput(text);
    setPlay(true);
  };
  useEffect(() => {
    if (play) setPlay(false);
  }, [play]);

  return (
    <div className="container-fluid p-0">
      <Header
        category={category}
        text={text}
        clearHeader={clearHeader}
        playHeader={playHeader}
      />

      <div className="category-main">
        <div className="row g-4 mt-5">
          {/* Subcategories (with blue background) */}
          {subcategories.map((subcategory) => (
            <div
              key={subcategory.id}
              className="col-6 col-sm-4 col-md-3 col-lg-3 d-flex align-items-stretch"
            >
              <Link
                className="category-button"
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
                    style={{ height: '100px', objectFit: 'contain' }}
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
            <div
              key={word.id}
              className="col-6 col-sm-4 col-md-3 col-lg-3 d-flex align-items-stretch"
            >
              <button
                className="word-button d-block text-center"
                onClick={() => handlePlay(word.word)}
              >
                {word.image && (
                  <img
                    className="mb-3"
                    src={word.image}
                    alt={word.word}
                    style={{ height: '100px', objectFit: 'contain' }}
                  />
                )}
                <p>{word.word}</p>
              </button>
            </div>
          ))}
        </div>
      </div>

      <TextToSpeech data={input} playAudio={play} />
    </div>
  );
};

export default CategoryPage;
