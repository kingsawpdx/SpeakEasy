import { useState, useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const FetchFromApi = ({ pictogramIds }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPictogramsById = async (pictogramIds) => {
    try {
      // Log the pictogram IDs to the console
      console.log('Fetching pictograms with IDs:', pictogramIds);

      // eslint-disable-next-line react/prop-types
      const pictograms = pictogramIds.map((id) => ({
        id,
        imageUrl: `https://static.arasaac.org/pictograms/${id}/${id}_2500.png`, // Image resolution: 2500px
      }));

      console.log('Pictograms with URLs:', pictograms); // Log the resulting array of pictograms
      return pictograms;
    } catch (error) {
      console.error('Error fetching pictograms:', error);
      throw new Error('Failed to fetch pictograms');
    }
  };

  useEffect(() => {
    const getPictograms = async () => {
      setLoading(true);

      try {
        const fetchedImages = await fetchPictogramsById(pictogramIds);
        setImages(fetchedImages); // Set the fetched images in the state
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    getPictograms(); // Trigger the fetch
  }, [pictogramIds]); // Dependency on pictogramIds, will re-fetch if it changes

  return (
    <div>
      {loading ? (
        <p>Loading images...</p>
      ) : (
        <div>
          {images.length === 0 ? (
            <p>No images found.</p>
          ) : (
            <div className="image-grid">
              {' '}
              {/* CSS Grid for images */}
              {images.map((image) => (
                <div key={image.id} className="image-item">
                  <h2>Pictogram ID: {image.id}</h2>
                  <img
                    src={image.imageUrl}
                    alt={`Pictogram ${image.id}`}
                    className="pictogram-image"
                  />{' '}
                  {/* Render the image */}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FetchFromApi;
