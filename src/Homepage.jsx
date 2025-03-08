import { useEffect, useState } from 'react';

const Homepage = () => {
  const [categories, setCategories] = useState([]);
  const [words, setWords] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:3000/categories').then((res) => res.json()),
      fetch('http://localhost:3000/words').then((res) => res.json()),
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
      <div
        className="fixed-top bg-light text-dark p-3"
        style={{
          height: '120px',
          display: 'flex',
          alignItems: 'center',
          zIndex: 1,
        }}
      >
        <h5 className="mx-auto">Selected Words Will Appear Here</h5>
      </div>

      <div
        className="fixed-top bg-black text-white fw-bold"
        style={{
          top: '120px',
          width: '100%',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
        }}
      >
        <h4 className="m-0">
          {selectedCategory ? selectedCategory : 'Select a Category'}
        </h4>
      </div>

      <div className="container mt-5 pt-5">
        <div className="row">
          {categories.map((category) => {
            const categoryWord = words.find(
              (word) => word.isCategoryId === category.id
            );

            return (
              <div
                key={category.id}
                className="col-md-3 col-sm-4 col-xs-6 mb-4 "
              >
                <button
                  className="btn w-100 h-100 text-center p-3 d-flex flex-column justify-content-center align-items-center bg-info"
                  onClick={() => setSelectedCategory(category.name)}
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
                  <span>{category.name}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
