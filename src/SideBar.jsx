import './SideBar.css';

const SideBar = ({ handlePlay }) => {
  const commonWords = [
    { id: 1, word: "I" },
    { id: 2, word: "I like" },
    { id: 2, word: "I want" },
    { id: 3, word: "I need" },
    { id: 4, word: "Hello" },
    { id: 5, word: "Thank you" },
    { id: 6, word: "Please" },
    { id: 7, word: "Yes" },
    { id: 8, word: "No" },
    { id: 9, word: "I feel" },
    { id: 10, word: "Good Bye" },
    { id: 11, word: "No problem" },
    { id: 12, word: "I'm sorry" },
    { id: 13, word: "I wait for" },
  ];

  return (
    <div className="sidebar fixed-left p-4" style={{ width: '195px', background: 'lightblue', height: '100vh', overflowY: 'auto', marginTop:'170px'}}>
      <h5 className="text-center mb-4">Common Words</h5>
      <div className="d-flex flex-column " >
        {commonWords.map((item) => (
          <button
            key={item.id}
            className="btn btn-light mb-2 sidebar-button"
            onClick={() => handlePlay(item.word)}
            style={{ border: '2px solid black', borderRadius: '10px', padding: '10px' }}
          >
            {item.word}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SideBar;