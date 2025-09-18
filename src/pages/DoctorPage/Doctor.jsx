import { useState } from "react";
import { Card, CardContent } from "../../components/Card1";
import { Button } from "../../components/button1";
import { Input } from "../../components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/select";

const doctors = [
  {
    name: "Dr. Sarah Johnson",
    specialization: "Cardiologist",
    location: "Mumbai",
    experience: "12 years",
    rating: 4.8,
    fee: 800,
    status: "Available Now",
    languages: ["English", "Hindi", "Marathi"],
    nextAvailable: "Today, 2:30 PM",
  },
  {
    name: "Dr. Michael Anderson",
    specialization: "Dermatologist",
    location: "Delhi",
    experience: "8 years",
    rating: 4.7,
    fee: 600,
    status: "Busy",
    languages: ["English", "Hindi", "Gujarati"],
    nextAvailable: "Tomorrow, 10:00 AM",
  },
  {
    name: "Dr. Emily Davis",
    specialization: "General Physician",
    location: "Bangalore",
    experience: "6 years",
    rating: 4.6,
    fee: 500,
    status: "Available Now",
    languages: ["English", "Hindi", "Kannada"],
    nextAvailable: "Today, 4:00 PM",
  },
  {
    name: "Dr. Robert Wilson",
    specialization: "Orthopedic Surgeon",
    location: "Hyderabad",
    experience: "15 years",
    rating: 4.9,
    fee: 1200,
    status: "Available Now",
    languages: ["English", "Hindi", "Telugu"],
    nextAvailable: "Today, 6:00 PM",
  },
  {
    name: "Dr. Sophia Martinez",
    specialization: "Pediatrician",
    location: "Chennai",
    experience: "10 years",
    rating: 4.7,
    fee: 700,
    status: "Busy",
    languages: ["English", "Hindi", "Tamil"],
    nextAvailable: "Tomorrow, 11:30 AM",
  },
  {
    name: "Dr. William Thompson",
    specialization: "Neurologist",
    location: "Pune",
    experience: "18 years",
    rating: 4.9,
    fee: 1500,
    status: "Available Now",
    languages: ["English", "Hindi", "Marathi"],
    nextAvailable: "Today, 5:00 PM",
  },
  {
    name: "Dr. Olivia Brown",
    specialization: "Gynecologist",
    location: "Kolkata",
    experience: "9 years",
    rating: 4.6,
    fee: 650,
    status: "Available Now",
    languages: ["English", "Hindi", "Bengali"],
    nextAvailable: "Today, 7:30 PM",
  },
  {
    name: "Dr. Daniel Evans",
    specialization: "Psychiatrist",
    location: "Cochin",
    experience: "11 years",
    rating: 4.8,
    fee: 900,
    status: "Busy",
    languages: ["English", "Hindi", "Malayalam"],
    nextAvailable: "Tomorrow, 9:30 AM",
  },
  {
    name: "Dr. Chloe Taylor",
    specialization: "Dentist",
    location: "Nagpur",
    experience: "7 years",
    rating: 4.5,
    fee: 400,
    status: "Available Now",
    languages: ["English", "Hindi", "Marathi"],
    nextAvailable: "Today, 3:15 PM",
  },
  {
    name: "Dr. James Miller",
    specialization: "ENT Specialist",
    location: "Visakhapatnam",
    experience: "13 years",
    rating: 4.7,
    fee: 750,
    status: "Available Now",
    languages: ["English", "Hindi", "Telugu"],
    nextAvailable: "Today, 2:45 PM",
  },
];



export default function DoctorPage() {
  const [search, setSearch] = useState("");

  const filteredDoctors = doctors.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-44 text-white bg-dark-600 relative top-10 w-[80rem] p-10 rounded-3xl">
      {/* Hero Section */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">
          Find & Book Appointments with{" "}
          <span className="text-green-400">Trusted Doctors</span>
        </h1>
        <p className="text-muted-foreground mt-2">
          Connect with experienced healthcare professionals, book appointments
          instantly, and get the care you deserve.
        </p>

        <div className="flex justify-center gap-10 mt-6 text-sm">
          <div>
            <p className="font-bold text-lg">500+</p>
            <p>Qualified Doctors</p>
          </div>
          <div>
            <p className="font-bold text-lg">25+</p>
            <p>Specializations</p>
          </div>
          <div>
            <p className="font-bold text-lg">24/7</p>
            <p>Always Available</p>
          </div>
          <div>
            <p className="font-bold text-lg">100%</p>
            <p>Verified Profiles</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-dark-400 p-4 rounded-xl mb-8 flex gap-4 items-center text-black">
        <Input
          placeholder="Search doctors by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
        <Select>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="All Specializations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="cardiology">Cardiology</SelectItem>
            <SelectItem value="dermatology">Dermatology</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="All Locations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="mumbai">Mumbai</SelectItem>
            <SelectItem value="delhi">Delhi</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Doctor Cards */}
      <div className="grid grid-cols-3 gap-6">
        {filteredDoctors.map((doc, index) => (
          <Card key={index}>
            <CardContent className="p-6 bg-dark-400 rounded-xl">
              {/* Name and Status */}
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold">{doc.name}</h3>
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    doc.status === "Available Now"
                      ? "bg-green-500 text-white"
                      : doc.status === "Busy"
                      ? "bg-yellow-500 text-white"
                      : "bg-gray-500 text-white"
                  }`}
                >
                  {doc.status}
                </span>
              </div>

              <p className="text-sm text-muted-foreground">
                {doc.specialization}
              </p>
              <p className="text-yellow-400 font-medium">
                ⭐ {doc.rating} ({doc.experience} exp)
              </p>

              {/* Location + Fee */}
              <p className="text-sm mt-2">📍 {doc.location}</p>
              <p className="text-sm">💰 ₹{doc.fee}</p>

              {/* Availability */}
              <p className="text-sm mt-2">
                ⏰ Next available: {doc.nextAvailable}
              </p>

              {/* Languages */}
              <div className="flex flex-wrap gap-2 mt-2">
                {doc.languages.map((lang, i) => (
                  <span
                    key={i}
                    className="bg-dark-600 px-2 py-1 text-xs rounded-md"
                  >
                    {lang}
                  </span>
                ))}
              </div>

              {/* Button */}
              <Button className="w-full mt-4 bg-primary-blue-600">
                Book Appointment
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
