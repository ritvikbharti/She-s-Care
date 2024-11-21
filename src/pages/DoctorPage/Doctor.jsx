import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import DoctorCard from './components/DoctorCard';
import SpecialistCard from './components/SpecialistCard';
import doctorData from '../../assets/doctorcard.json';
import Card from '../../components/card';

export default function Doctor() {
  const [showAllDoctors, setShowAllDoctors] = useState(false); // State to toggle DoctorCards
  const [showAllSpecialists, setShowAllSpecialists] = useState(false); // State to toggle SpecialistCards

  // Handler for DoctorCards
  const handleShowMoreDoctors = () => setShowAllDoctors(true);
  const handleShowLessDoctors = () => setShowAllDoctors(false);

  // Handler for SpecialistCards
  const handleShowMoreSpecialists = () => setShowAllSpecialists(true);
  const handleShowLessSpecialists = () => setShowAllSpecialists(false);

  // Number of cards to display initially
  const visibleDoctors = showAllDoctors ? doctorData.Recommended : doctorData.Recommended.slice(0, 4);
  const visibleSpecialists = showAllSpecialists ? doctorData.Specialized : doctorData.Specialized.slice(0, 3);

  return (
    <>
      <div className="h-full ms-[9rem] flex flex-col lg:flex-row">
        {/* Main Content */}
        <main className="flex-grow p-4 md:p-6 space-y-8">
          {/* Welcome Card */}
          <Card className="bg-primary_hard p-6 my-5 rounded-[2rem]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Welcome, Dr. Shabrina</h2>
                <p className="text-indigo-200">Have a nice day at work</p>
              </div>
              <div className="w-32 h-32 relative">
                <img src="/placeholder.svg" alt="Doctor illustration" className="object-contain" />
              </div>
            </div>
          </Card>

          {/* Our Doctors Section */}
          <section>
            <h2 className="text-lg md:text-xl font-semibold text-white mb-4 ml-7 text-[21px]">Our Doctors</h2>
            <div className="space-y-4">
              <div className="bg-dark-900 h-[auto] rounded-lg shadow-xl flex px-[2rem] py-[2rem] flex-wrap">
                {visibleDoctors.map((doctor, index) => (
                  <DoctorCard
                    key={index}
                    name={doctor.name}
                    specialization={doctor.specialization}
                    image={doctor.image}
                    experience={doctor.experience}
                    fee={doctor.fee}
                    contact={doctor.contact}
                  />
                ))}
              </div>

              {/* Show More / Show Less Button for Doctors */}
              <div className="text-center mt-4">
                {!showAllDoctors ? (
                  <button
                    onClick={handleShowMoreDoctors}
                    className="bg-primary_blue text-white py-2 px-4 rounded-lg shadow-md hover:bg-primary_dark transition-all"
                  >
                    Show More
                  </button>
                ) : (
                  <button
                    onClick={handleShowLessDoctors}
                    className="bg-primary_blue text-white py-2 px-4 rounded-lg shadow-md hover:bg-primary_dark transition-all"
                  >
                    Show Less
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* Specialized Section */}
          <section>
            <h2 className="text-lg md:text-xl font-semibold text-white mb-4 ml-7 text-[21px]">Specialized</h2>
            <div className="space-y-4">
              {visibleSpecialists.map((doctor, index) => (
                <SpecialistCard
                  key={index}
                  name={doctor.name}
                  specialization={doctor.specialization}
                  image={doctor.image}
                  experience={doctor.experience}
                  fee={doctor.fee}
                  contact={doctor.contact}
                />
              ))}
            </div>

            {/* Show More / Show Less Button for Specialists */}
            <div className="text-center mt-4">
              {!showAllSpecialists ? (
                <button
                  onClick={handleShowMoreSpecialists}
                  className="bg-primary_blue text-white py-2 px-4 rounded-lg shadow-md hover:bg-primary_dark transition-all"
                >
                  Show More
                </button>
              ) : (
                <button
                  onClick={handleShowLessSpecialists}
                  className="bg-primary_blue text-white py-2 px-4 rounded-lg shadow-md hover:bg-primary_dark transition-all"
                >
                  Show Less
                </button>
              )}
            </div>
          </section>
        </main>

        {/* Right Aside Section */}
        <aside className="w-full lg:w-1/4 bg-primary_dark p-4 flex flex-col items-center">
          <section className="flex flex-col items-center py-6 space-y-6">
            <div className="h-[20rem] w-[16rem] bg-primary-text-100 rounded-lg flex flex-col justify-between p-4 shadow-lg">
              {/* Greeting and Chat Header */}
              <div className="text-left">
                <h2 className="text-black font-semibold text-lg">Hi, Marry!</h2>
                <p className="text-gray-600 text-sm">How can I help you?</p>
              </div>

              {/* Chat Input */}
              <div className="flex bg-primary_gray rounded-full p-2 shadow-md max-w-lg w-[15rem] flex-row items-center">
                <input
                  type="text"
                  placeholder="Ask me anything ..."
                  className="flex-grow bg-transparent outline-none rounded-lg px-4 text-gray-600 placeholder-primary_dark w-[11rem]  bg-primary_gray"
                />
                <button className=" bg-primary_gray h-10 w-10 flex items-center justify-center rounded-full shadow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="black"
                    className="w-4 h-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0l-6 6m6-6l-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </>
  );
}
