import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CarsList.css';

const CarsList = ({ make }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch car image from Unsplash
  const fetchCarImage = async (make, model) => {
    try {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: { query: `${make} ${model}`, per_page: 1 },
        headers: {
          Authorization: `Client-ID NJYYBmCvPeSLt9at4tAP9nMPddLJp6r5wrfbB49ZLk8`,
        },
      });

      const imageUrl = response.data.results[0]?.urls?.regular;
      return imageUrl || 'https://via.placeholder.com/300';
    } catch (error) {
      console.error(`Image fetch failed for ${make} ${model}:`, error);
      return 'https://via.placeholder.com/300';
    }
  };

  // Fetch all car models for a specific make
  const fetchCars = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${make}`, {
        headers: {
          'x-rapidapi-key': 'bc763f9d22msh64e8be73ffeb3f3p107821jsnb01c0b4ea3ff',
          'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com'
        }
      });

      const carData = response.data;

      // Fetch image for each car model
      const carsWithImages = await Promise.all(carData.map(async (car) => {
        const image = await fetchCarImage(car.make, car.model);
        return { ...car, image };
      }));

      setCars(carsWithImages);
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [make]);

  if (loading) {
    return <div>Loading {make} cars...</div>;
  }

  return (
    <div className="cars-list">
      <h2 className="car-model-heading">{make} Cars</h2>
      {cars.length === 0 ? (
        <p>No car data available for {make}.</p>
      ) : (
        cars.map((car, index) => (
          <div className="car-card" key={index}>
            <img src={car.image} alt={`${car.make} ${car.model}`} className="car-image" />
            <div className="car-info">
              <h3>{car.make} {car.model}</h3>
              <p><strong>Year:</strong> {car.year}</p>
              <p><strong>Type:</strong> {car.class || 'N/A'}</p>
              <p><strong>Fuel:</strong> {car.fuel_type || 'N/A'}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CarsList;
