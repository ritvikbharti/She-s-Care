import React from 'react';

const DoctorCard = ({ name, specialization, image }) => {
  return (
    <div className="bg-primary-text-100 h-[200px] w-[200px] rounded-lg shadow-md p-4 flex flex-col justify-between m-2">
      <div className={`bg-gray-300 h-[60px] w-[60px] rounded-full mb-4 mx-auto`} style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
      <h4 className="text-center font-semibold text-lg">{name}</h4>
      <p className="text-center text-gray-600">{specialization}</p>
    </div>
  );
};

export default DoctorCard;
