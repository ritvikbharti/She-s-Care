import { Bell, Calendar, Home, Mail, Settings, Users } from "lucide-react";
import { useState } from "react";
import Button from "../../components/button";
import Card from "../../components/card";
import { Link } from "react-router-dom";
import { FaDna, FaHeartbeat, FaVial } from "react-icons/fa";
import { GiBodyHeight, GiHealthNormal } from "react-icons/gi";
import { MdMonitorHeart, MdBloodtype } from "react-icons/md";
import { FaPlus, FaAngleDown } from "react-icons/fa6";
import girlImg from "../../assets/girl.png";

export default function Dashboard() {
  const [currentMonth] = useState(() => {
    const today = new Date();
    const options = { month: "long", year: "numeric" };
    return today.toLocaleDateString("en-US", options); 
  });
  const today = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);
  return (
    <div className="w-full me-[23rem] px-2 relative top-10  text-white ">
      {/* Main Content */}
      <div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-primary_hard text-sm">
              {formattedDate.split(",")[0]},{" "}
              <span className="text-primary-text-100">
                {formattedDate.split(",")[1].trim()}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost">Test Report History</Button>
            <Link to={"/test"}>
              <Button>+ Add New Test</Button>
            </Link>
            <Bell className="w-6 h-6 text-slate-400" />
          </div>
        </div>

        {/* Welcome Card */}
        <div>
          <Card className="relative bg-primary_hard h-40 p-6 mt-28  my-5 rounded-[2rem]">
            <div className="absolute bottom-0 left-0">
              <img
                src={girlImg}
                alt="Doctor illustration"
                className="object-contain h-[16rem]"
              />
            </div>
            <div className="flex items-center mt-5 me-10 justify-end">
              <div className="">
                <h2 className="text-4xl  mb-3">
                  Welcome, <span className="font-bold">Nidhi Kumari</span>
                </h2>
                <p className="text-indigo-200 text-xl   flex justify-end ">
                  Have a nice day at work
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="flex justify-between relative top-2 mb-3">
          <h2 className="text-xl font-semibold mb-4">Report</h2>
          <h2 className="text-sm mb-4 font-thin me-5 flex gap-2 items-center">
            This month{" "}
            <FaAngleDown className="font-thin size-4 text-gray-300 " />
          </h2>
        </div>
        <div className="grid ms-1 grid-cols-5 me-1 gap-10 mb-8">
          <Card className="bg-secondary_dark  flex justify-center">
            <div className="flex flex-col p-2">
              <FaDna className="bg-indigo-600 p-4 mb-3 rounded-2xl mx-auto w-16 h-16 " />
              <span className="text-slate-400 mb-2 mx-auto">Hormone</span>
              <span className="text-2xl font-bold mx-auto">18</span>
            </div>
          </Card>
          <Card className="bg-secondary_dark  flex justify-center">
            <div className="flex flex-col p-2">
              <FaHeartbeat className="bg-cyan-400 p-4 mb-3 rounded-2xl mx-auto w-16 h-16 " />
              <span className="text-slate-400 mb-2 mx-auto">Pelvic US</span>
              <span className="text-2xl font-bold mx-auto">10</span>
            </div>
          </Card>
          <Card className="bg-secondary_dark  flex justify-center">
            <div className="flex flex-col p-2">
              <MdBloodtype className="bg-pink-600 p-4 mb-3 rounded-2xl mx-auto w-16 h-16 " />
              <span className="text-slate-400 mb-2 mx-auto">Sugar</span>
              <span className="text-2xl font-bold mx-auto">80</span>
            </div>
          </Card>
          <Card className="bg-secondary_dark  flex justify-center">
            <div className="flex flex-col p-2">
              <GiHealthNormal className="bg-blue-600 p-4 mb-3 rounded-2xl mx-auto w-16 h-16 " />
              <span className="text-slate-400 mb-2 mx-auto">Throid</span>
              <span className="text-2xl font-bold mx-auto">3</span>
            </div>
          </Card>

          <Card className=" border-dashed border-2 cursor-pointer border-primary_hard p-4 rounded-2xl">
            <div className=" flex justify-center items-center h-full">
              <FaPlus className="size-9  text-primary_hard" />
            </div>
          </Card>
        </div>

        {/* Calendar Section */}
        <Card className="bg-secondary_dark p-6 rounded-2xl relative top-4 mb-8 h-[25rem]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">{currentMonth}</h3>
            <div className="flex gap-2">
              <Button variant="ghost">←</Button>
              <Button variant="ghost">→</Button>
            </div>
          </div>
          {/* Event List */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="bg-indigo-600 rounded-lg p-3 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Check Up</span>
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-slate-300" />
                    <div className="w-6 h-6 rounded-full bg-slate-400" />
                  </div>
                </div>
              </div>
              <div className="bg-pink-600 rounded-lg p-3 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Surgery</span>
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-slate-300" />
                    <div className="w-6 h-6 rounded-full bg-slate-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
