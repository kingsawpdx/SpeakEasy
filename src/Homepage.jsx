import { useEffect, useState } from "react";
import { Link } from "react-router";
const Homepage = () => {
  const [categories, setCategories] = useState([]);
  const [words, setWords] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => {
        console.error(error);
      });
    console.log("Categories", categories);
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/words")
      .then((res) => res.json())
      .then((data) => setWords(data))
      .catch((error) => {
        console.error(error);
      });
    console.log("Words", words);
  }, []);

  return (
    <>
      <div>
        <h1>AAC Home</h1>
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.id}`}
            state={{ words: words }}
          >
            <button>{category.name}</button>{" "}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Homepage;
