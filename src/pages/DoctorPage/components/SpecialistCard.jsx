import React from 'react'

const  SpecialistCard = ({name, specialization, image, contact, fee, experience}) =>{
  return (
    <div className='h-[16rem] w-full bg-primary_dark rounded-lg flex flex-row justify-between items-center m-2 text-white'>
        <div className='h-[11rem] w-[11rem] bg-regal_blue m-4 rounded-full' style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}></div>
        <div className='h-[11rem] w-3/4 bg-regal_blue m-1 '>
        {/* Doctor Name */}
      <h4 className="text-center font-semibold text-lg">{name}</h4>
{/* Specialization */}
<p className="text-center text-gray-600">{specialization}</p>
      <div className='float-end mt-4 mr-2'>


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
    </div>
  )
}

export default SpecialistCard