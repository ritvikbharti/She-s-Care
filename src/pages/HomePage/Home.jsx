import React from "react";
import Navbar from "../../components/Navbar";
import ProfileSection from "../../components/ProfileSection";
import Dashboard from "../DashboardPage/Dashboard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {


  return (
    <>
      <Dashboard />

      <ProfileSection />
    </>
  );
}
