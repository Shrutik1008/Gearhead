import React from 'react';
import './App.css';
import ImageSlider from "./components/ImageSlider";


function App() {
  return (
    <div className="App">
      <div className="title">
        <h2 align="center">Gear Head</h2>
      </div>

      <section className="section">
        <div>
          <button className="btn">Home</button>
        </div>
        <div>
          <button className="btn one">Collection</button>
        </div>
        <div>
          <button className="btn two">About</button>
        </div>
        <div>
          <button className="btn three">Contact</button>
        </div>
        {/* <div>
          <button className="btn four">opacity</button>
        </div> */}
      </section>
      <ImageSlider />
    </div>
  );
}

export default App;
