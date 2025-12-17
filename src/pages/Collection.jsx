import { useState } from "react";
import CarsList from "../components/CarsList";

const carMakes = [
  "Rolls-Royce","Toyota","Honda","Ford","Chevrolet","BMW",
  "Mercedes-Benz","Audi","Tesla","Porsche","Ferrari",
  "Lamborghini","Bentley","Bugatti"
];

const Collection = () => {
  const [selectedMake, setSelectedMake] = useState(null);

  return (
    <>
      <div className="car-makes-buttons">
        {carMakes.map(make => (
          <button
            key={make}
            className="car-make-button"
            onClick={() => setSelectedMake(make)}
          >
            {make}
          </button>
        ))}
      </div>

      {selectedMake && <CarsList make={selectedMake} />}
    </>
  );
};

export default Collection;
