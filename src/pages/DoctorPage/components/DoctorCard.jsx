import React from 'react';

const DoctorCard = ({ name, specialization, image, contact, fee, experience }) => {
  return (
    <div className="bg-white h-[280px] w-[250px] rounded-2xl shadow-md p-4 flex flex-col justify-between m-2 text-black">
      {/* Doctor Image */}
      <div
        className="bg-gray-300 h-[150px] w-[150px] rounded-full mb-4 mx-auto"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      <div className=''>

      {/* Doctor Name */}
      <h4 className="text-center font-bold text-[24px]">{name}</h4>

{/* Specialization */}
<p className="text-center text-primary_gray">{specialization}</p>

{/* Additional Info */}
{/* <div className="mt-2 text-sm ">
  <p className="text-gray-700">
    <strong>Fee:</strong> {fee}
  </p>
  <p className="text-gray-700">
    <strong>Experience:</strong> {experience}
  </p>
  <p className="text-gray-700">
    <strong>Contact:</strong> {contact}
  </p>
      </div> */}
      </div>
       <button className=" text-white py-2 px-4 w-[13rem] mt-2 rounded-lg shadow-md bg-primary_dark transition-all hover:bg-primary-gray-100">
            Consult
          </button>
    </div>
  );
};

export default DoctorCard;
