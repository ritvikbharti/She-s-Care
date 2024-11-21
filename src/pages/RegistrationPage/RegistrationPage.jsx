import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./css/RegistrationPage.css"; // Move inline styles to a separate CSS file
import google from '../../assets/logo/google.png'
import carousel1 from "../../assets/carousel/carousel1.png"
import carousel2 from "../../assets/carousel/carousel2.png"
import carousel3 from "../../assets/carousel/carousel3.png"

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    termsAccepted: false,
  });

  const slides = [
    { id: 1, text: "", image: carousel1 },
    { id: 2, text: "", image: carousel2},
    { id: 3, text: "", image:  carousel3},
  ];

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      alert("Please accept the terms and conditions!");
      return;
    }
    console.log("Form submitted:", formData);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Left Section - Carousel */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-gradient-to-b  from-purple-900 to-gray-900 p-10">
        <div className="text-4xl font-extrabold mb-3 text-white text-[59px] font-serif">Fairy Mate</div>
        {/* <div className="w-3/4 h-[500px]"> Increased carousel height */}
          {/* <Slider {...carouselSettings}>
            {slides.map((slide) => (
              <div key={slide.id} className="flex flex-col items-center h-[29rem] ">
                <img
                  src={slide.image}
                  alt={`Slide ${slide.id}`}
                  className="rounded-lg shadow-lg w-full h-full object-cover "
                />
                <h2 className="text-white text-lg font-semibold mt-4">{slide.text}</h2>
              </div>
            ))}
          </Slider> */}

        {/* </div> */}
        <p className="text-gray-600 text-[19px] ml-[5rem] font-serif">Consult to our Doctors Seemlessly.</p>
      </div>

      {/* Right Section - Registration Form */}
      <div className="w-1/2 flex items-center justify-center"> 
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-10 rounded-lg shadow-md w-3/4 space-y-5"
        >
          <h2 className="text-3xl font-bold mb-2">Create an account</h2>
          <p>
            Already have an account?{" "}
            <a href="/login" className="text-purple-400 underline">
              Log in
            </a>
          </p>

          <div className="flex space-x-3">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              className="p-3 w-1/2 bg-gray-700 rounded-md focus:outline-none"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              className="p-3 w-1/2 bg-gray-700 rounded-md focus:outline-none"
              required
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="p-3 w-full bg-gray-700 rounded-md focus:outline-none"
            required
          />
          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              className="p-3 w-full bg-gray-700 rounded-md focus:outline-none"
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleInputChange}
              className="mr-2"
              required
            />
            <label htmlFor="termsAccepted">
              I agree to the{" "}
              <a href="/terms" className="text-purple-400 underline">
                Terms & Conditions
              </a>
            </label>
          </div>
          <button
            type="submit"
            className="bg-purple-600 w-full py-3 rounded-md text-white hover:bg-purple-500"
          >
            Create account
          </button>

          <div className="text-center mt-5">Or register with</div>
          <div className="flex justify-center space-x-5 mt-3">
            <button className="bg-gray-700 p-3 rounded-md flex items-center space-x-2">
              <img src= {google} alt="Google" className="h-5 w-5" />
              <span>Google</span>
            </button>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
