// import React, { useEffect } from 'react'
// import Navbar from '../../components/Navbar'
// import Quiz from './Quiz'
// import { FaChevronDown } from "react-icons/fa6";

// export default function Test() {

 
//   return (
//       <div className='h-screen bg-regal_blue '>
//             <div className='relative rounded-2xl h-fit p-7 pb-2 top-[4rem] mx-auto  w-[60rem] text-white bg-secondary_dark'>
//                 <div className='flex justify-between'>
//                     <p className='text-xl font-semibold'>Test</p>
//                     <p className='text-primary-text-100 flex'>This PCOD test is co-created with doctor <FaChevronDown className='relative top-1 left-2'/></p>
//                 </div>
//                 <Quiz/>
//             </div>
//       </div>
//       )
// }


// Test.jsx
// Test.jsx
import React, { useState } from "react";
import Quiz from "./Quiz";
import { FaChevronDown } from "react-icons/fa6";

export default function Test() {
  const [risk, setRisk] = useState(null);
  const [detected, setDetected] = useState(null);

  return (
    <div className="min-h-screen bg-regal_blue flex justify-center pt-20">
      <div className="w-[60rem] bg-secondary_dark text-white p-6 rounded-2xl shadow-lg">

        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold">PCOS Risk Test</p>
          <p className="text-sm text-gray-300 flex">
            Co-created with doctors <FaChevronDown className="ml-2 mt-1"/>
          </p>
        </div>

        {/* RESULT CARD */}
        {risk !== null && (
          <div className="mt-6 bg-black/40 p-5 rounded-xl text-center">
            <h2 className="text-3xl font-bold">Risk: {risk.toFixed(2)}%</h2>

            {detected === 1 ? (
              <p className="text-red-400 text-lg mt-2">⚠️ High Risk of PCOS</p>
            ) : (
              <p className="text-green-400 text-lg mt-2">✅ Low Risk of PCOS</p>
            )}

            {/* Progress Bar */}
            <div className="w-full bg-gray-700 h-3 rounded-full mt-3">
              <div
                className="bg-red-500 h-3 rounded-full transition-all"
                style={{ width: `${risk}%` }}
              />
            </div>
          </div>
        )}

        <Quiz setRisk={setRisk} setDetected={setDetected} />
      </div>
    </div>
  );
}