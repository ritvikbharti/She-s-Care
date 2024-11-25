import React from "react";
import { addItem } from "../../app/slices/cartSlice";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
const ProductCard = ({
  name,
  description,
  price,
  originalPrice,
  discount,
  imageUrl,
  bestSeller,
}) => {
  const notifySubmit = ()=>{
    toast("Items Added To Cart");
}
const contextClass = {
    success: "bg-blue-600",
    error: "bg-red-600",
    info: "bg-gray-600",
    warning: "bg-orange-400",
    default: "bg-indigo-500",
    dark: "bg-white-600 font-gray-300",
  };
  
  const dispatch = useDispatch();
  return (
    <div className="max-w-xs bg-white  rounded-2xl shadow-md p-4 text-center relative">
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
        <button 
  className="mt-4 bg-primary-blue-900 w-full text-white font-semibold py-2 px-4 rounded-xl hover:bg-blue-700"
  onClick={(e) => {
    dispatch(addItem({
      imageUrl: imageUrl,
      name: name,
      description: description,
      price: price,
      originalPrice: originalPrice,
      discount: discount
    }));
    notifySubmit();
  }}
>
  ADD
</button>

        <ToastContainer
                toastClassName={(context) =>
                contextClass[context?.type || "default"] +
                " relative flex p-1 min-h-10 rounded-xl justify-between overflow-hidden font-semibold cursor-pointer m-2"
                }
                bodyClassName={() => "font-white  block p-3"}
                position="bottom-right"
                hideProgressBar
                autoClose={3000}
            />
      </div>
    </div>
  );
};

export default ProductCard;
