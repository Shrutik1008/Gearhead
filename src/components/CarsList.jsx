import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CarsList.css'; // make sure this file exists and contains styling

const CarsList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch car info from "Cars by API Ninjas"
  const fetchCars = async () => {
    try {
      const response = await axios.get('https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=corolla', {
        headers: {
          'x-rapidapi-key': 'bc763f9d22msh64e8be73ffeb3f3p107821jsnb01c0b4ea3ff',
          'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com'
        }
      });
      const carData = response.data;

      // For each car, fetch image from "Car Imagery API"
      const carsWithImages = await Promise.all(carData.map(async (car) => {
        const image = await fetchCarImage(car.make, car.model);
        return { ...car, image };
      }));

      setCars(carsWithImages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cars:', error);
      setLoading(false);
    }
  };

  // Fetch car image from Car Imagery API
  const fetchCarImage = async (make, model) => {
    try {
      const response = await axios.get(`https://car-imagery.p.rapidapi.com/getimage?searchTerm=${make}%20${model}`, {
        headers: {
          'x-rapidapi-key': 'bc763f9d22msh64e8be73ffeb3f3p107821jsnb01c0b4ea3ff',
          'x-rapidapi-host': 'car-imagery.p.rapidapi.com'
        }
      });
      const imageUrl = response.data.image;

      console.log('Fetched image URL:', imageUrl); // Log the image URL for debugging
      return imageUrl || 'https://via.placeholder.com/300'; // Fallback image if URL is null
    } catch (error) {
      console.error('Error fetching car image:', error);
      return 'https://via.placeholder.com/300'; // Fallback image
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  if (loading) {
    return <div>Loading cars...</div>;
  }

  return (
    <div className="cars-list">
      {cars.map((car, index) => (
        <div className="car-card" key={index}>
          <img
            src={car.image}
            alt={`${car.make} ${car.model}`}
            className="car-image"
          />
          <div className="car-info">
            <h3>{car.make} {car.model}</h3>
            <p><strong>Year:</strong> {car.year}</p>
            <p><strong>Type:</strong> {car.class}</p>
            <p><strong>City Mileage:</strong> {car.city_mpg} mpg</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarsList;
