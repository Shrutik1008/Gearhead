import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CarsList.css';

const CarsList = ({ make }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all car models for a specific make
  const fetchCars = async () => {
    try {
      const response = await axios.get(
        `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${make}`,
        {
          headers: {
            'x-rapidapi-key': 'bc763f9d22msh64e8be73ffeb3f3p107821jsnb01c0b4ea3ff',
            'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com',
          },
        }
      );

      const carData = response.data;

      // Add image for each car model
      const carsWithImages = await Promise.all(
        carData.map(async (car) => {
          const image = await fetchCarImage(car.make, car.model, car.year || 2020);
          return { ...car, image };
        })
      );

      setCars(carsWithImages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cars:', error);
      setLoading(false);
    }
  };

  // Fetch car image from CarsXE API
  const fetchCarImage = async (make, model, year = 2020) => {
    try {
      const response = await axios.get('https://api.carsxe.com/images', {
        params: {
          key: 'zjla9pky1_9nkm2i4wv_prlxivz8w',
          make: make,
          model: model,
          year: year,
        },
      });

      const imageUrl = response.data.image || 'https://via.placeholder.com/300';
      return imageUrl;
    } catch (error) {
      console.error(`Image fetch failed for ${make} ${model}:`, error);
      return 'https://via.placeholder.com/300';
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
      {cars.map((car, index) => (
        <div className="car-card" key={index}>
          <img
            src={car.image}
            alt={`${car.make} ${car.model}`}
            className="car-image"
          />
          <div className="car-info">
            <h3>
              {car.make} {car.model}
            </h3>
            <p>
              <strong>Year:</strong> {car.year}
            </p>
            <p>
              <strong>Type:</strong> {car.class}
            </p>
            <p>
              <strong>Fuel Type:</strong> {car.fuel_type}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarsList;
