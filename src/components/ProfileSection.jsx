import React from "react";
import { HiBell } from "react-icons/hi";
import { LuDot } from "react-icons/lu";
import profileImage1 from '../assets/01.png';
import profileImage2 from '../assets/02.png';
import profileImage3 from '../assets/03.png';
import userImg from '../assets/user.png'
import numberOfPatientsImage from '../assets/numberOfP.png';

const ProfileSection = () => {
  return (
    <section className="flex flex-col bg-primary_dark h-full w-[22rem] text-white float-right">
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
          <div className="patient flex my-3">
            <div>
              <img src={profileImage2} alt="Profile" className="w-10 rounded-full" />
            </div>
            <div className="ms-3 ">
              <h1>Arya Wijaya Kusuma</h1>
              <div className="flex mt-1 flex-shrink">
                <span className="text-primary-text-100">Jan 28, 2020 . 9 AM - 11 AM</span>
              </div>
            </div>
          </div>
          <div className="patient flex my-3 ">
            <div>
              <img src={profileImage3} alt="Profile" className="w-10 rounded-full" />
            </div>
            <div className="ms-3 ">
              <h1>Arya Wijaya Kusuma</h1>
              <div className="flex mt-1 flex-shrink">
                <span className="text-primary-text-100">Jan 28, 2020 . 9 AM - 11 AM</span>
              </div>
            </div>
          </div>
        </div>
        <div className="number-graph">
          <h2 className="m-5">Number of patients</h2>
          <img src={numberOfPatientsImage} alt="Number of Patients" className="w-[10rem] mb-4 m-auto rounded-xl shadow-lg " />
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
