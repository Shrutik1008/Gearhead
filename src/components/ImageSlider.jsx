import { useEffect, useState } from "react";
import { getSliderImages } from "../services/imageService";
import "./ImageSlider.css";

const ImageSlider = () => {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    getSliderImages().then(setImages);
  }, []);

  useEffect(() => {
    if (!images.length) return;
    const timer = setInterval(
      () => setIndex(i => (i + 1) % images.length),
      4000
    );
    return () => clearInterval(timer);
  }, [images]);

  return (
    <div className="slider-container">
      <div
        className="slides"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((img, i) => (
          <div className="slide" key={i}>
            <img src={img} alt={`Slide ${i}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
