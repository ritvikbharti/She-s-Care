import { useState, useEffect } from "react";
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

export default function DoctorPage() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch doctors from backend
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/doctors");
        const data = await res.json();
        setDoctors(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  // Filter doctors by search
  const filteredDoctors = doctors.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase())
  );

  // Book appointment handler
 const handleBook = async (doctorId) => {
    try {
      const res = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add authorization header if using login
          // "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ doctorId }),
      });

      const  data = await res.json();
      if (res.ok) {
        alert("Appointment booked successfully!");
      } else {
        alert(data.message || "Failed to book appointment");
      }
    } catch (err) {
      console.error("Error booking appointment:", err);
    }
  };

  if (loading) return <p className="text-white text-center mt-10">Loading doctors...</p>;

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
        {filteredDoctors.map((doc) => (
          <Card key={doc._id}>
            <CardContent className="p-6 bg-dark-400 rounded-xl">
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

              <p className="text-sm text-muted-foreground">{doc.specialization}</p>
              <p className="text-yellow-400 font-medium">
                ⭐ {doc.rating} ({doc.experience} exp)
              </p>
              <p className="text-sm mt-2">📍 {doc.location}</p>
              <p className="text-sm">💰 ₹{doc.fee}</p>
              <p className="text-sm mt-2">⏰ Next available: {doc.nextAvailable}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {doc.languages.map((lang, i) => (
                  <span key={i} className="bg-dark-600 px-2 py-1 text-xs rounded-md">
                    {lang}
                  </span>
                ))}
              </div>

              <Button
                className="w-full mt-4 bg-primary-blue-600"
                onClick={() => handleBook(doc._id)}
              >
                Book Appointment
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
