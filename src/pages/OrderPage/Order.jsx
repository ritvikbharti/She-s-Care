import { MinusIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Button } from '../../components/button1';
import { Card, CardContent } from "../../components/Card1";
import { Input } from "../../components/input";
import Navbar from '../../components/Navbar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/select";
import Slideshow from '../../components/Slideshow';
// offer images
import o2 from '../../assets/offer02.jpg';
import o3 from '../../assets/offer03.jpg';
import o4 from '../../assets/offer04.jpg';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Order() {
  const [quantities, setQuantities] = useState({});
  const items = useSelector((state) => state.cart1); // Access cart items from Redux
  console.log('Cart Items: ', items);

  const handleQuantityChange = (itemName, quantity) => {
    setQuantities((prev) => ({
      ...prev,
      [itemName]: quantity,
    }));
  };

  return (
    <div>
      <div className="container mx-44 text-white bg-dark-600 relative top-10 w-[80rem] p-10 rounded-3xl">
        <h1 className="text-2xl font-bold mb-6">Order Summary</h1>

        <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
          <div className="space-y-6">
            {/* Promotional Banners */}
            <div className="rounded-2xl">
              <img src={o2} alt="Promotional Banner" className="rounded-xl" />
            </div>

            {/* Products */}
            <div className="space-y-4">
              <h2 className="text-sm text-muted-foreground">PRODUCTS</h2>

              {items.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-4 flex gap-4 rounded-2xl bg-dark-400">
                    <img src={item.imageUrl} alt={item.name} className="w-32 rounded-lg" />
                    <div className="flex-1 space-y-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold">₹{item.price}</span>
                        <span className="text-sm text-muted-foreground line-through">₹{item.originalPrice}</span>
                        <span className="text-sm text-green-600">{item.discount}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Delivery within 2-3 days</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Trash2Icon className="h-5 w-5 text-muted-foreground cursor-pointer" />
                      <Select
                        defaultValue="1"
                        onValueChange={(value) => handleQuantityChange(item.name, value)}
                      >
                        <SelectTrigger className="w-20">
                          <SelectValue placeholder="QTY" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="text-muted-foreground text-center py-2">
                FAIRYMATE FIRST customers get extra ₹40.44 cashback on this order
              </div>

              <Link to="/product">
                <Button className="w-full bg-primary-blue-600 top-2 relative rounded-xl">
                  ADD MORE ITEMS
                </Button>
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6 rounded-xl">
            <Card>
              <CardContent className="p-4 bg-primary-gray-100 rounded-xl space-y-4">
                <div className="space-y-2">
                  <h2 className="font-medium">Promo Code</h2>
                  <Input placeholder="Enter promo code" />
                  <Button className="w-full bg-primary-blue-600">Apply Promo Code</Button>
                </div>

                <div className="pt-4 border-t space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">MRP Total</span>
                    <span>₹{items.reduce((acc, item) => acc + item.originalPrice, 0)}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{items.reduce((acc, item) => acc + (item.originalPrice - item.price), 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span>₹{items.reduce((acc, item) => acc + item.price, 0)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
            <div className="bg-primary-red-100 rounded-lg p-4">
              <p className="text-primary-red-900 font-medium flex items-center gap-2">
                <span className="text-lg">🏷️</span>
                FAIRYMATE FIRST customers get extra ₹40.44 cashback on this order
              </p>
            </div>

            <div className="flex items-center justify-between bg-primary-sky-100 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-lg">⚡</span>
                <div>
                  <p className="font-medium">Superfast Delivery</p>
                  <p className="text-sm text-muted-foreground">high priority delivery for all orders</p>
                </div>
              </div>
              <Link to={"/product"} className="bg-yellow-400 hover:bg-yellow-500 text-black">
              <Button >+ADD TO CART</Button>
              </Link>
            </div>

            <div className="bg-pink-500 text-white p-4 rounded-lg text-center">
              👑 Membership starting from ₹99 for 3 months
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
