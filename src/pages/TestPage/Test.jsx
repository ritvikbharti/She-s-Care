import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar'
import Quiz from './Quiz'
import { FaChevronDown } from "react-icons/fa6";

export default function Test() {

 
  return (
      <div className='h-screen bg-regal_blue '>
            <div className='relative rounded-2xl h-fit p-7 pb-2 top-[4rem] mx-auto  w-[60rem] text-white bg-secondary_dark'>
                <div className='flex justify-between'>
                    <p className='text-xl font-semibold'>Test</p>
                    <p className='text-primary-text-100 flex'>This PCOD test is co-created with doctor <FaChevronDown className='relative top-1 left-2'/></p>
                </div>
                <Quiz/>
            </div>
      </div>
      )
}
