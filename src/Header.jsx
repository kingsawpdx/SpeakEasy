const Header = ({ category, text, clearHeader, playHeader, toggleTTS}) => {
  if (category) {
    console.log(category);
    category = category.charAt(0).toUpperCase() + category.slice(1);
  }
  return (
    <div
      className="fixed-top bg-light text-dark p-3"
      style={{
        height: "120px",
        display: "flex",
        alignItems: "center",
        zIndex: 1,
      }}
    >
      {text ? (
        <h5>{text}</h5>
      ) : (
        <h5 className="mx-auto">Selected Words Will Appear Here</h5>
      )}
      <div
        className="fixed-top bg-black text-white fw-bold"
        style={{
          top: "120px",
          width: "100%",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px",
          zIndex: 1,
        }}
      >
        <button
          onClick={() => history.back()}
          style={{
            backgroundColor: "grey",
            borderRadius: "10px",
            marginRight: "10px",
          }}
        >
          Back
        </button>
        <p>{category}</p>
        <div>
          <button
            onClick={clearHeader}
            style={{
              backgroundColor: "grey",
              borderRadius: "10px",
              marginRight: "10px",
            }}
          >
            Clear
          </button>
          <button
            onClick={playHeader}
            style={{
              backgroundColor: "grey",
              borderRadius: "10px",
              marginRight: "10px",
            }}
          >
            Play
          </button>

          
          <button
            onClick={toggleTTS}
            style={{
              backgroundColor: "blue",
              color: "white",
              borderRadius: "10px",
              marginRight: "10px",
            }}
          >
            TTS Settings
          </button>


        </div>
      </div>
    </div>
  );
};

export default Header;