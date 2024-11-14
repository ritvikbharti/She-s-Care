import React from "react";

const ProductCard = ({ name, description, price, originalPrice, discount, imageUrl }) => {
  return (
    <div className="max-w-xs bg-white rounded-lg shadow-md p-4 text-center">
      <img
        src={imageUrl}
        alt={name}
        className="w-24 h-24 mx-auto"
      />
      <h2 className="mt-4 text-lg font-semibold">{name}</h2>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
      <div className="mt-2 flex items-center justify-center text-gray-700">
        <span className="text-xl font-bold">₹{price}</span>
        <span className="text-sm line-through ml-2">₹{originalPrice}</span>
        <span className="text-sm text-green-600 ml-2">{discount}</span>
      </div>
      <button className="mt-4 bg-green-700 text-white font-semibold py-2 px-4 rounded hover:bg-green-800">
        ADD
      </button>
    </div>
  );
};

export default ProductCard;
