import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

const Homepage = () => {
  const [categories, setCategories] = useState([]);
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;
  // Fetch categories and words
  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/categories`).then((res) => res.json()),
      fetch(`${API_URL}/words`).then((res) => res.json()),
    ])
      .then(([categoriesData, wordsData]) => {
        setCategories(categoriesData);
        setWords(wordsData);
      })
      .catch((error) => console.error('Error fetching data:', error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <h2 className="text-center mt-5">Loading...</h2>;

  return (
    <div className="container-fluid p-0">
      <Header />

      <div className="container mt-5 pt-5">
        <div className="row">
          {categories.map((category) => {
            const categoryWord = words.find(
              (word) => word.isCategoryId === category.id
            );

            return (
              <div
                key={category.id}
                className="col-6 col-sm-4 col-md-3 col-lg-3 d-flex align-items-stretch mt-5"
              >
                <Link
                  className="category-button mt-3"
                  to={`/category/${category.id}`}
                  state={{ words: words, category: category.name }}
                >
                  {categoryWord && (
                    <img
                      src={categoryWord.image}
                      alt={category.name}
                      className="mb-3"
                      style={{
                        height: '100px',
                        objectFit: 'contain',
                      }}
                    />
                  )}
                  <span>
                    {category.name.charAt(0).toUpperCase() +
                      category.name.slice(1)}
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
