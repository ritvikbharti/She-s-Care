import React from 'react';
import Navbar from '../../components/Navbar';
import DoctorCard from './components/DoctorCard';
import doctorData from '../../assets/doctorcard.json';
export default function Doctor() {
  return (
    <>
      <Navbar />
      <div className="h-full ms-[9rem]  flex flex-col md:flex-row">
        {/* Sidebar */}
        {/* <aside className="w-full md:w-1/4 lg:w-1/5 bg-secondary p-4">
          <h2 className="text-white font-bold text-lg md:text-xl">Doctors</h2>
        </aside> */}

        {/* Main Content */}
        <main className="flex-grow p-4 md:p-6 space-y-8">
          <section>
          <h2 className="text-lg md:text-xl font-semibold text-white mb-4">Our Doctors</h2>
          </section>
          {/* Recommended Section */}
          <section>
            <h3 className="text-lg md:text-xl font-semibold text-white mb-4">Recommended</h3>
            <div className="space-y-4">
              <div className="bg-dark-900 h-[auto] rounded-lg shadow-md flex px-[2rem] py-[2rem] flex-wrap">
              {doctorData.Recommended.map((doctor, index) => (
                  <DoctorCard
                    key={index}
                    name={doctor.name}
                    specialization={doctor.specialization}
                    image={doctor.image}
                  />
                ))}
              </div>
              <div className="bg-dark-900 h-[200px] rounded-lg shadow-md"></div>
             
            </div>
          </section>

          {/* Our Specialists Section */}
          <section>
            <h3 className="text-lg md:text-xl font-semibold text-white mb-4">Our Specialists</h3>
            <div className="space-y-4">
            <div className="bg-dark-900 h-[auto] rounded-lg shadow-md flex px-[2rem] py-[2rem] flex-wrap">
            {doctorData.Specialized.map((doctor, index) => (
                  <DoctorCard
                    key={index}
                    name={doctor.name}
                    specialization={doctor.specialization}
                    image={doctor.image}
                  />
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* Right Chat Section */}
        <aside className="w-full md:w-1/4 lg:w-1/5 bg-secondary p-4 flex flex-col items-center ">
        <section className=" flex flex-col items-center py-6 space-y-6">
  {/* Section Title */}
  {/* <h1 className="text-white text-xl font-semibold">Current Online Doctor</h1> */}

  {/* Profile Picture */}
  {/* <div className="bg-white h-[70px] w-[70px] rounded-full mb-2"></div> */}

  {/* Chat Card */}
  <div className="h-[20rem] w-[16rem] bg-primary-text-100 rounded-lg flex flex-col justify-between p-4 shadow-lg">
    {/* Greeting and Chat Header */}
    <div className="text-left">
      <h2 className="text-black font-semibold text-lg">Hi, Marry!</h2>
      <p className="text-gray-600 text-sm">How can I help you?</p>
    </div>
    <div className="flex  bg-primary_gray rounded-full p-2 shadow-md  max-w-lg w-[15rem] flex-row items-center">
  {/* Input Field */}
  <input
    type="text"
    placeholder="Ask me anything ..."
    className="flex-grow bg-transparent outline-none rounded-lg px-4 text-gray-600 placeholder-primary_dark w-[11rem] bg-primary_gray"
    
  />

  {/* Submit Button */}
  <button className="bg-white h-10 w-10 flex items-center justify-center rounded-full shadow">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="black"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 12h14m0 0l-6 6m6-6l-6-6"
      />
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
