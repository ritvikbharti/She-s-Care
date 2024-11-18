import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Slideshow = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Clone the images for infinite loop effect
  const extendedImages = [...images, images[0]];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length ? 1 : prevIndex + 1
      );
    }, 2000); // Move every 1 second

    return () => clearInterval(interval);
  }, [images.length]);

  // Smoothly reset to loop when reaching the clone
  useEffect(() => {
    if (currentIndex === images.length) {
      const timeout = setTimeout(() => {
        setCurrentIndex(0); // Reset without animation
      }, 1000); // Match animation duration

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, images.length]);

  return (
    <div className="overflow-hidden w-full relative">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * (100 / 3)}%)`,
        }}
      >
        {extendedImages.map((image, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 px-[10px]" // Add gap with padding
          >
            <img
              src={image}
              alt={`Slide ${idx + 1}`}
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

Slideshow.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Slideshow;
