import React from "react";
import Navbar from "../../components/Navbar";
import ProductCard from "./ProductCard";
import { FiSearch } from "react-icons/fi";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import productData from "../../assets/product.json";
import img1 from "../../assets/asthiposhak.png";
import Slideshow from "../../components/Slideshow";
import { useSelector } from "react-redux";

//images import
import t1 from "../../assets/trending01.jpg";
import t2 from "../../assets/trending02.jpg";
import t3 from "../../assets/trending03.jpg";
import t4 from "../../assets/trending04.jpg";
import t5 from "../../assets/trending05.jpg";
import t6 from "../../assets/trending06.jpg";
import t7 from "../../assets/trending07.jpg";
import t8 from "../../assets/trending08.jpg";
import t9 from "../../assets/trending9.jpg";
import t10 from "../../assets/trending10.jpg";


//offer import
import o1 from "../../assets/offer01.jpg"
import o2 from "../../assets/offer02.jpg"
import o3 from "../../assets/offer03.jpg"
import o4 from "../../assets/offer04.jpg"
import o5 from "../../assets/offer05.jpg"
import o6 from "../../assets/offer06.jpg"
import o7 from "../../assets/offer07.jpg"
import o8 from "../../assets/offer08.jpg"
import { Link } from "react-router-dom";

export default function Product() {
  const imagesUrl = [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10];
  const offerUrl = [o1, o2,o3,o4,o5,o6,o7,o8];

  const items = useSelector(state=>state);
  console.log('items3', items);
  return (
    <div>

      <div className="me-10 ms-[9rem]">
        {/* Top bar */}
        <div className="top_bar z-30 top-10 w-[83rem] relative flex  justify-between">
          <div className="search_main w-[30rem] bg-white rounded-2xl px-3 flex ">
            <input
              type="text"
              placeholder="Search for medicine, products, etc."
              className="bg-white rounded-2xl h-10 w-[30rem] p-3 focus:outline-none"
            />
            <FiSearch className="text-primary_hard float-end size-7 my-auto" />
          </div>
          <div className="text-white gap-4 flex">
            <FaUser className="size-6" />
            <Link to={"/order"}><FaCartShopping className="size-6" /></Link> 
          </div>
        </div>

        {/* main content */}
        <div className="relative z-10 top-14">

          {/* Images slideshow */}
          <div className="relative top-10">
            <h2 className="text-white text-2xl relative bottom-4 font-semibold">
              Trending Today
            </h2>
            <Slideshow images={imagesUrl} />
          </div>

          {/* Product section */}
          <div className="product_container relative top-20">
            <h2 className="text-white text-2xl relative top-0 bottom-4 font-semibold">
              Recommended For You . . .
            </h2>
            <div className=" relative top-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {productData.map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  discount={product.discount}
                  imageUrl={product.imageUrl}
                  bestSeller={product.bestSeller}
                />
              ))}
            </div>
          </div>
          {/* Images slideshow */}
          <div className="relative top-36">
            <h2 className="text-white text-2xl relative bottom-4 font-semibold">
              Today's Offer
            </h2>
            <img src={o1} alt="" className="rounded-3xl" />
            {/* <Slideshow images={offerUrl} /> */}
          </div>

             {/* Images slideshow */}
             <div className="relative top-44">
            <h2 className="text-white text-2xl relative bottom-4 font-semibold">
              Trending Today
            </h2>
            <Slideshow images={imagesUrl} />
          </div>
             {/* Product section */}
             <div className="product_container relative top-56">
            <h2 className="text-white text-2xl relative top-0 bottom-4 font-semibold">
              Similar Product . . .
            </h2>
            <div className=" relative top-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {productData.map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  discount={product.discount}
                  imageUrl={product.imageUrl}
                  bestSeller = {product.bestSeller}
                />
              ))}
            </div>
          </div>
         <div className="text-dark-900 relative mt-[20rem]">
          h
         </div>
        </div>
      </div>
    </div>
  );
}
