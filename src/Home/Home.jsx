function Home({ words }) {
  return (
    <>
      <h1>SpeakEasy</h1>
      <ul>
        {words.map((word, index) => (
          <li key={index}>{word.word}</li>
        ))}
      </ul>

      <div className="container">
        <h2>Word Grid</h2>
        <div className="grid">
          {words.map((word, index) => (
            <div key={index} className="card">
              <img src={word.image_url} alt={word.word} className="word-image" />
              <p>{word.word}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
