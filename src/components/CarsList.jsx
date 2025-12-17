import { useEffect, useState } from "react";
import { getCarsByMake } from "../services/carService";
import { getCarImage } from "../services/imageService";
import "./CarsList.css";

const CarsList = ({ make }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCars = async () => {
      try {
        setLoading(true);
        setError(null);

        const carData = await getCarsByMake(make);

        const carsWithImages = await Promise.all(
          carData.map(async car => ({
            ...car,
            image: await getCarImage(car.make, car.model),
          }))
        );

        setCars(carsWithImages);
      } catch {
        setError("Failed to load cars");
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, [make]);

  if (loading) return <p className="loading">Loading {make} cars...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="cars-list">
      {cars.map(car => (
        <div
          className="car-card"
          key={`${car.make}-${car.model}`}
        >
          <img src={car.image} alt={`${car.make} ${car.model}`} />
          <div className="car-info">
            <h3>{car.make} {car.model}</h3>
            <p><strong>Year:</strong> {car.year}</p>
            <p><strong>Fuel:</strong> {car.fuel_type}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarsList;
