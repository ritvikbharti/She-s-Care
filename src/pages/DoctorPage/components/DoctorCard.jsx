import React from 'react';

const DoctorCard = ({ name, specialization, image, contact, fee, experience }) => {
  return (
    <div className="bg-primary_dark h-[280px] w-[250px] rounded-lg shadow-md p-4 flex flex-col justify-between m-2 text-white">
      {/* Doctor Image */}
      <div
        className="bg-gray-300 h-[150px] w-[100px] rounded-full mb-4 mx-auto"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      <div className=''>

      {/* Doctor Name */}
      <h4 className="text-center font-bold text-lg">{name}</h4>

{/* Specialization */}
<p className="text-center text-gray-600">{specialization}</p>

{/* Additional Info */}
<div className="mt-2 text-sm ">
  <p className="text-gray-700">
    <strong>Fee:</strong> {fee}
  </p>
  <p className="text-gray-700">
    <strong>Experience:</strong> {experience}
  </p>
  <p className="text-gray-700">
    <strong>Contact:</strong> {contact}
  </p>
      </div>
      </div>
    </div>
  );
};

export default DoctorCard;
