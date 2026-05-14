import React, { useState, useEffect } from "react";
import { HiBell } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import userImg from "../assets/user.png";
import Chatbot from "../pages/chatbot/Chatbot";
import axios from "axios";

const ProfileSection = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(
          "https://she-care-backend-63p6.onrender.com/api/auth/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user:", error.response?.data || error.message);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/login";
  };

  return (
    <div className="fixed top-0 right-0 h-screen w-[22em] bg-gradient-to-b from-[#0d0f1a] via-[#10162b] to-[#070a12] border-l border-white/10 shadow-2xl">
      <section className="flex flex-col h-full text-white px-5 py-4">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-semibold tracking-wide text-white/90">
            My Profile
          </h2>

          <div className="flex items-center gap-3">
            <button className="relative hover:scale-105 transition">
              <HiBell className="text-xl text-white/80 hover:text-white" />
              <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            </button>

            <button
              onClick={handleLogout}
              className="hover:scale-105 transition text-white/70 hover:text-red-400"
            >
              <FiLogOut className="text-lg" />
            </button>
          </div>
        </div>

        {/* Profile Card (Smaller) */}
        <div className="rounded-3xl p-4 bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg">
          <div className="flex items-center gap-4">

            {/* Avatar */}
            <div className="relative">
              <img
                src={userImg}
                alt="Profile"
                className="w-16 h-16 rounded-full border-2 border-indigo-500/50 shadow-lg"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-[#0d0f1a]" />
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h2 className="text-sm font-bold text-white leading-tight">
                {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
              </h2>
              <p className="text-xs text-white/60 truncate">
                {user?.email || "Fetching email..."}
              </p>

              <span className="inline-block mt-2 px-3 py-[2px] text-[10px] font-semibold rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md">
                Premium ✨
              </span>
            </div>
          </div>

          {/* Stats (Smaller) */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="rounded-2xl p-2 bg-white/5 border border-white/10 text-center">
              <p className="text-[10px] text-white/60">Reports</p>
              <p className="text-sm font-bold text-indigo-400">12</p>
            </div>

            <div className="rounded-2xl p-2 bg-white/5 border border-white/10 text-center">
              <p className="text-[10px] text-white/60">Wallet</p>
              <p className="text-sm font-bold text-green-400">₹ 500</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-4 border-t border-white/10" />

        {/* Chatbot Section (FIXED HEIGHT) */}
        <div className="flex-1 min-h-0 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-lg flex flex-col">
          
          <div className="p-3 border-b border-white/10">
            <h3 className="text-xs font-semibold text-white/80 tracking-wide">
              AI Health Assistant 🤖
            </h3>
            <p className="text-[11px] text-white/50 mt-1">
              Ask about PCOS, diet, stress, symptoms & lifestyle.
            </p>
          </div>

          {/* This is the main fix */}
          <div className="flex-1 min-h-0 overflow-y-auto p-3">
            <Chatbot />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfileSection;