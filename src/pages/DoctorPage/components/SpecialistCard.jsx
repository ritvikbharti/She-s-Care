import React from 'react';

const SpecialistCard = ({ name, specialization, image, contact, fee, experience }) => {
  return (
    <div className="h-auto w-full bg-white rounded-2xl flex flex-col md:flex-row justify-between items-center m-2 text-black shadow-md">
      {/* Profile Image */}
      <div
        className="h-[14rem] rounded-2xl w-[14rem] bg-regal_blue m-4  mx-auto md:mx-4"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      {/* Details Section */}
      <div className="w-full md:w-3/4 px-4 md:ml-[2rem] flex flex-col text-center md:text-left">
        {/* Doctor Name */}
        <p className="font-bold text-[29px] md:text-[22px] leading-7 text-black tracking-wide mt-[2px]">{name}</p>

        {/* Specialization */}
        <p className="text-gray-900 text-[16px] font-medium ">{specialization}</p>

        {/* Description */}
        <p className="text-gray-500 text-[14px] mt-1 leading-5">
ium accusantium quidem vel v repellat ad reprehenderit
          tempore dolorum laboriosam a quaerat minima explicabo, placeat maxime dolorem quae distinctio.
        </p>

        {/* Additional Info */}
        <div className="mt-3 text-[14px] leading-6 bg-primary_hard p-4 rounded-lg flex flex-col md:flex-row justify-between items-center mb-1">
          {/* Fee, Experience, Contact */}
          <div className="text-center md:text-left mb-3 md:mb-0">
            <p className="text-gray-900 font-bold text-[21px]">{fee}</p>
            <p className="text-gray-900 font-semi-bold text-[19px]">{experience}</p>
            <p className="text-gray-900 font-medium text-[16px]">{contact}</p>
          </div>

          {/* Consult Button */}
          <button className=" text-white py-2 px-4 rounded-lg shadow-md bg-primary_dark transition-all hover:bg-primary-gray-100">
            Consult
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecialistCard;
