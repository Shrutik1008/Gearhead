import React, { useState } from 'react';
import './App.css';
import ImageSlider from "./components/ImageSlider";
import CarsList from "./components/CarsList";

// List of car makes
const carMakes = [
  "Toyota",
  "Honda",
  "Ford",
  "Chevrolet",
  "BMW",
  "Mercedes-Benz",
  "Nissan",
  "Hyundai",
  "Kia",
  "Volkswagen",
  "Audi",
  "Tesla",
  "Jeep",
  "Mazda",
  "Subaru",
  "Lexus",
  "Dodge",
  "Ram",
  "GMC",
  "Volvo",
  "Porsche",
  "Ferrari",
  "Lamborghini",
  "Jaguar",
  "Land Rover"
];

function App() {
  const [selectedMake, setSelectedMake] = useState(null);

  const handleButtonClick = (make) => {
    setSelectedMake(make); // Set the selected car make
  };

  return (
    <div className="App">
      <div className="title">
        <h2 align="center">Gear Head</h2>
      </div>

      <section className="section">
        <div><button className="btn">Home</button></div>
        <div><button className="btn one">Collection</button></div>
        <div><button className="btn two">About</button></div>
        <div><button className="btn three">Contact</button></div>
      </section>

      <main className="content">
        <ImageSlider />

        {/* Display car makes as buttons */}
        <div className="car-makes-buttons">
          {carMakes.map((make, index) => (
            <button 
              key={index} 
              className="car-make-button" 
              onClick={() => handleButtonClick(make)}
            >
              {make}
            </button>
          ))}
        </div>

        {/* Display car models of the selected make */}
        {selectedMake && <CarsList make={selectedMake} />}
      </main>
    </div>
  );
}

export default App;
