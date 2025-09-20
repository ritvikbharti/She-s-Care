import React, { useState, useEffect } from "react";
import { HiBell } from "react-icons/hi";
import userImg from "../assets/user.png";
import Chatbot from "../pages/chatbot/Chatbot";
import axios from "axios";

const ProfileSection = () => {
  const [user, setUser] = useState(null);

  // Fetch user info from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("⚠️ No token found in localStorage");
          return;
        }

        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("User fetched for profile:", res.data);
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user for profile:", error.response?.data || error.message);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="fixed top-0 right-0 h-full w-[22em] bg-primary_dark">
      <section className="flex flex-col items-stretch text-white">
        <div className="flex justify-between mx-5 my-2">
          <h2 className="font-semibold">My Profile</h2>
          <span className="text-xl">
            <HiBell />
          </span>
        </div>

        <div className="profile-image-container m-auto my-3 w-[13rem]">
          <img src={userImg} alt="Profile" />
          <h2 className="font-semibold text-center mt-2">
            {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
          </h2>
        </div>

        {/* Add Chatbot component */}
        <Chatbot />
      </section>
    </div>
  );
};

export default ProfileSection;
