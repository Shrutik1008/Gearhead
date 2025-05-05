import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ImageSlider.css';

const ImageSlider = () => {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);

  const fetchImages = async () => {
    try {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          query: 'sports car',
          per_page: 6,
        },
        headers: {
          Authorization: 'Client-ID NJYYBmCvPeSLt9at4tAP9nMPddLJp6r5wrfbB49ZLk8', // <-- Replace this!
        },
      });

      const imageUrls = response.data.results.map((img) => img.urls.regular);
      setImages(imageUrls);
    } catch (error) {
      console.error('Error fetching slider images:', error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [images]);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="slider-container">
      <div className="slider">
        <div
          className="slides"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((src, i) => (
            <div className="slide" key={i}>
              <img src={src} alt={`Slide ${i + 1}`} />
            </div>
          ))}
        </div>

        <button className="arrow left" onClick={prevSlide}>
          &#10094;
        </button>
        <button className="arrow right" onClick={nextSlide}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
