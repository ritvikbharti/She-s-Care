import React, { useState } from "react";
import { HiBell } from "react-icons/hi";
import { LuDot } from "react-icons/lu";
import profileImage1 from '../assets/01.png';
import profileImage2 from '../assets/02.png';
import profileImage3 from '../assets/03.png';
import userImg from '../assets/user.png'
import numberOfPatientsImage from '../assets/numberOfP.png';
import { IoSend } from "react-icons/io5";
import { IoAttach } from "react-icons/io5";

const ProfileSection = () => {

  const [query, setQuery] = useState("");
  return (
    <section className="flex flex-col bg-primary_dark fixed top-0 right-0 h-full w-[22rem] text-white">
      <div className="flex justify-between mx-5 my-2">
        <h2 className="font-semibold">My Profile</h2>
        <span className="text-xl"><HiBell /></span>
      </div>
      <div className="profile-image-container m-auto my-3 w-[13rem] ">
        {/* Profile image can go here if needed */}
        <img src={userImg} alt="" />
        <h2 className="font-semibold text-center mt-2"> Anraa</h2>
      </div>
      <div className="last-patient-container flex flex-col">
        <div className="heading flex justify-between mx-9 my-2">
          <h2>Last Patient</h2>
          <button>View All</button>
        </div>
        <div className="patients-array text-base  flex flex-col justify-center m-auto">
          <div className="patient flex  my-3">
            <div>
              <img src={profileImage1} alt="Profile" className="w-10 rounded-full" />
            </div>
            <div className="ms-3 ">
              <h1>Arya Wijaya Kusuma</h1>
              <div className="flex mt-1 flex-shrink">
                <span className="text-primary-text-100">Jan 28, 2020 . 9 AM - 11 AM</span>
              </div>
            </div>
          </div>
        </div>



        {/* Chat Container */}
        <div className="chat_container bg-dark-900 rounded-2xl mx-2 h-[22rem]">
        {/* chat top section */}

        {/* Chat show section */}

        <div className="message_show  h-72">

        </div>
        {/* send request */}
        <div className="flex mx-2 bg-dark-400 justify-center rounded-2xl h-10">
        <IoAttach className="size-7 my-auto"/>
        <form action=""className="flex gap-2">
          <input 
          type="text" 
          value={query}
          placeholder="Message Fairy"
          className="bg-dark-400 w-64"
          />
          <button type="submit"><IoSend /></button>
        </form>
        </div>
        </div>



        {/* <div className="number-graph">
          <h2 className="m-5">Number of patients</h2>
          <img src={numberOfPatientsImage} alt="Number of Patients" className="w-[10rem] mb-4 m-auto rounded-xl shadow-lg " />
        </div> */}
      </div>
    </section>
  );
};

export default ProfileSection;
