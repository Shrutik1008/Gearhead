import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CarsList.css';

const CarsList = ({ make }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all car models for a specific make
  const fetchCars = async () => {
    try {
      // Get car data for all models of a given make
      const response = await axios.get(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${make}`, {
        headers: {
          'x-rapidapi-key': 'bc763f9d22msh64e8be73ffeb3f3p107821jsnb01c0b4ea3ff',
          'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com'
        }
      });

      const carData = response.data;

      // Log the API response to see what data you're getting
      console.log("API Response: ", carData);

      // Check if carData is an array and has content
      if (Array.isArray(carData) && carData.length > 0) {
        // Add image for each car model
        const carsWithImages = await Promise.all(carData.map(async (car) => {
          const image = await fetchCarImage(car.make, car.model);
          return { ...car, image };
        }));

        // Log the updated cars with images
        console.log("Cars with images: ", carsWithImages);

        setCars(carsWithImages);
      } else {
        console.log('No cars found for the given make.');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cars:', error);
      setLoading(false);
    }
  };

  // Fetch car image from Unsplash
 const fetchCarImage = async (make, model) => {
  try {
    const response = await axios.get('https://api.pexels.com/v1/search', {
      params: { query: `${make} ${model}`, per_page: 1 },
      headers: {
        Authorization: '4lQP4sRMpNAwLQgJXMHdohEy49Cxlp0lYMxpYBm8UK9exOXg1rStE1sM',
      },
    });

    // Pexels returns photos array
    const imageUrl = response.data.photos[0]?.src?.medium;

    console.log("Pexels Image URL: ", imageUrl);

    return imageUrl || 'https://via.placeholder.com/300';
  } catch (error) {
    console.error('Pexels image fetch failed:', error);
    return 'https://via.placeholder.com/300';
  }
};


  useEffect(() => {
    fetchCars();
  }, [make]);

  if (loading) {
    return <div>Loading {make} Cars...</div>;
  }

  return (
    <div className="cars-list">
      <h2 className="car-model-heading">{make} Cars</h2>
      {cars.length > 0 ? (
        cars.map((car, index) => (
          <div className="car-card" key={index}>
            <img src={car.image} alt={`${car.make} ${car.model}`} className="car-image" />
            <div className="car-info">
              <h3>{car.make} {car.model}</h3>
              <p><strong>Year:</strong> {car.year}</p>
              <p><strong>Type:</strong> {car.class}</p>
              <p><strong>Fuel Type:</strong> {car.fuel_type}</p>
            </div>
          </div>
        ))
      ) : (
        <div>No cars available for this make.</div>
      )}
    </div>
  );
};

export default CarsList;
