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
      <h1 className='text-white font-normal  relative top-52 text-xl text-center'>Coming Soon...</h1>
    </>
  );
}
