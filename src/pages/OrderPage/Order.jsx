import { MinusIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import { useState } from "react"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Button } from '../../components/button1'
import { Card, CardContent } from "../../components/Card1"
import { Input } from "../../components/input"
import Navbar from '../../components/Navbar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/select"

import Slideshow from '../../components/Slideshow';
//offer images
import o2 from '../../assets/offer02.jpg'
import o3 from '../../assets/offer03.jpg'
import o4 from '../../assets/offer04.jpg'

import p1 from '../../assets/charak01.jpeg'
import p2 from '../../assets/asthiposhak.png'
import { Link } from 'react-router-dom';


export default function Order() {
  const [quantities, setQuantities] = useState({ product1: 1, product2: 1 })
  const images = [
    o2, o3, o4
  ]
  return (
    <div>
    <div className="container mx-44   text-white bg-dark-600 relative top-10 w-[80rem] p-10 rounded-3xl">
      <h1 className="text-2xl font-bold mb-6">Order Summary</h1>
      
      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        <div className="space-y-6">
          {/* Promotional Banners */}
          <div className="rounded-2xl ">
            <img src={o2} alt="" className='rounded-xl' />
          </div>


          {/* Products */}
          <div className="space-y-4">
            <h2 className="text-sm text-muted-foreground">PRODUCTS</h2>
            
            <Card>
              <CardContent className="p-4 flex gap-4 rounded-2xl bg-dark-400">
               <img src={p1} alt="" className='w-32 rounded-lg'/>
                <div className="flex-1 space-y-1 ">
                  <h3 className="font-medium">CETAPHIL MOISTURISING Cream 250gm</h3>
                  <p className="text-sm text-muted-foreground">Mfr: Galderma India Pvt Ltd</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold">₹1,104.15</span>
                    <span className="text-sm text-muted-foreground line-through">₹1,299.00</span>
                    <span className="text-sm text-green-600">Save ₹194.85</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Delivery between NOVEMBER 20-NOVEMBER 21</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Trash2Icon className="h-5 w-5 text-muted-foreground cursor-pointer" />
                  <Select defaultValue="1">
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

            <Card>
              <CardContent className="p-4 flex rounded-2xl gap-4 bg-dark-400">
              <img src={p2} alt="" className='w-32 rounded-lg'/>
                <div className="flex-1 space-y-1">
                  <h3 className="font-medium">Dr. Odin Blood Glucose Test Strips - (GDH-FAD) (AC-307) (Pack of 2 x 25's)</h3>
                  <p className="text-sm text-primary-gray-100">Mfr: PASSIM MEDICHEM AGENCIES</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold">₹918.00</span>
                    <span className="text-sm text-muted-foreground line-through">₹1,350.00</span>
                    <span className="text-sm ">Save ₹432.00</span>
                  </div>
                  <p className="text-sm text-primary">Only 7 Left In Stock</p>
                  <p className="text-sm text-muted-foreground">Delivery between NOVEMBER 20-NOVEMBER 21</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Trash2Icon className="h-5 w-5 text-muted-foreground cursor-pointer" />
                  <Select defaultValue="1">
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

            <Link to={"/product"}>
            <Button className="w-full bg-primary-blue-600 top-2 relative rounded-xl">
              ADD MORE ITEMS
            </Button>
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6  rounded-xl">
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
                  <span>₹2,649.00</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Additional Discount</span>
                  <span>-₹626.85</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-400 border-none">
            <CardContent className="p-4 flex items-center gap-4">
              {/* <Image
                src="/placeholder.svg?height=50&width=50"
                alt="Delivery"
                width={50}
                height={50}
                className="rounded-full"
              /> */}
              <div>
                <p className="font-medium">₹0 delivery charges on this order</p>
                <p className="text-sm">Get Free delivery on your first order</p>
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
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">+ADD TO CART</Button>
            </div>

            <div className="bg-pink-500 text-white p-4 rounded-lg text-center">
              👑 Membership starting from ₹99 for 3 months
            </div>
          </div>
        </div>
      </div>

      {/* Saved for Later */}
      <div className="mt-8">
        <h2 className="text-lg font-medium mb-4">SAVED FOR LATER</h2>
        <p className="text-muted-foreground">No items in save for later</p>
      </div>
    </div>
    </div>
  )
}