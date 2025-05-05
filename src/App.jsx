// App.js
import React from 'react';
import './App.css';
import ImageSlider from "./components/ImageSlider";
import CarsList from "./components/CarsList";

function App() {
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

        {/* Render multiple CarsList sections for different models */}
        <CarsList model="corolla" />
        <CarsList model="civic" />
        <CarsList model="camry" />
        <CarsList model="mustang" />
      </main>
    </div>
  );
}

export default App;
