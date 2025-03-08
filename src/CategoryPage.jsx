import { useParams, useLocation } from "react-router-dom";

const CategoryPage = () => {
  const location = useLocation();
  const { categoryId } = useParams();

  const words = location.state?.words || [];

  const filteredWords = words.filter((word) => word.category == categoryId);

  return (
    <div>
      <ul>
        {filteredWords.map((word) => (
          <li key={word.id}>
            <button style={{ width: "200px", margin: "10px" }}>
            {word.image && <img src={word.image} alt={word.word} />}
              {word.word}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPage;
