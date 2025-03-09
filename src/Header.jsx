const Header = ({ text, clearHeader, playHeader }) => {
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
          justifyContent: "flex-end",
          padding: "10px",
          zIndex: 1,
        }}
      >
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
      </div>
    </div>
  );
};

export default Header;
