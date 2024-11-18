import React from "react";

const ProductCard = ({
  name,
  description,
  price,
  originalPrice,
  discount,
  imageUrl,
  bestSeller,
}) => {
  return (
    <div className="max-w-xs bg-white rounded-2xl shadow-md p-4 text-center relative">
      {/* Best Seller Badge */}
      {bestSeller && (
        <div className="absolute top-4 left-2 bg-primary-green-400 text-white text-xs font-semibold px-2 py-1 rounded-lg">
          Best Seller
        </div>
      )}

      <div>
        <img src={imageUrl} alt={name} className="w-24 z-0 h-44 mx-auto" />
        <h2 className="mt-4 text-lg font-semibold">{name}</h2>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
        <div className="mt-2 flex items-center justify-center text-gray-700">
          <span className="text-xl font-bold">₹{price}</span>
          <span className="text-sm line-through ml-2">₹{originalPrice}</span>
          <span className="text-sm text-primary-green-400 ml-2">{discount}</span>
        </div>
        <button className="mt-4 bg-primary-blue-900 w-full text-white font-semibold py-2 px-4 rounded-xl hover:bg-blue-700">
          ADD
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
