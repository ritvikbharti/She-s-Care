import React from "react";
import Navbar from "../../components/Navbar";
import ProductCard from "./ProductCard";
import { FiSearch } from "react-icons/fi";
import { FaCartShopping } from "react-icons/fa6";
import productData from "E:/fairymate-ui/fairymate-ui/src/assets/product.json"
export default function Product() {
  return (
    <div className="h-screen ">
      <Navbar />
      <div className="me-10 ms-[9rem]">
        <div className="top_bar w-[100rem] flex">
          <div className="search_main w-[20rem] bg-white h-10 rounded-3xl">
            <input 
            type="text"
            placeholder="Search for medicine, products, etc."
            />
            <FiSearch className="text-white"/>
          </div>
          <div>
            <FaCartShopping className="text-white"/>
          </div>
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productData.map((product) => (
          <ProductCard
          key={product.id}
          name={product.name}
          description={product.description}
          price={product.price}
          originalPrice={product.originalPrice}
          discount={product.discount}
          imageUrl={product.imageUrl}
          />
        ))}
        </div>
      </div>
    // </div>
  );
}
