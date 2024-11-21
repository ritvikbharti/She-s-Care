import React from "react";
import Navbar from "../../components/Navbar";
import ProfileSection from "../../components/ProfileSection";
import Dashboard from "../DashboardPage/Dashboard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const notify = () => {
    toast("Login Successfull");
  };
  const contextClass = {
    success: "bg-blue-600",
    error: "bg-red-600",
    info: "bg-gray-600",
    warning: "bg-orange-400",
    default: "bg-blue-500",
    dark: "bg-white-600 font-gray-300",
  };
  
  return (
    <>
      <Dashboard />
      <button onClick={notify} className="text-white bg-blue-400 px-4 py-2 rounded">
        Notify!
      </button>
      <ToastContainer
        toastClassName={(context) =>
          contextClass[context?.type || "default"] +
          " relative flex p-1 min-h-10 rounded-xl justify-between overflow-hidden font-semibold cursor-pointer"
        }
        bodyClassName={() => "font-white  block p-3"}
        position="bottom-right"
        hideProgressBar
        autoClose={3000}
      />
      <ProfileSection />
    </>
  );
}
