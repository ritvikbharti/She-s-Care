import { useState, useEffect } from "react";
import { Card, CardContent } from "../../components/Card1";
import { Button } from "../../components/button1";
import { Input } from "../../components/input";
import api from "../../utils/api"; // ✅ shared axios instance
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/select";

const TIME_SLOTS = [
  "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "02:00 PM", "03:00 PM",
  "04:00 PM", "05:00 PM",
];

export default function DoctorPage() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [specializationFilter, setSpecializationFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  // ✅ Booking modal state
  const [bookingDoctor, setBookingDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await api.get("/api/doctors");
        setDoctors(res.data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        toast.error("Failed to load doctors");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  // Derived filter lists from actual data
  const specializations = [...new Set(doctors.map((d) => d.specialization))];
  const locations = [...new Set(doctors.map((d) => d.location))];

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase());
    const matchesSpec =
      specializationFilter === "all" || doc.specialization === specializationFilter;
    const matchesLoc =
      locationFilter === "all" || doc.location === locationFilter;
    return matchesSearch && matchesSpec && matchesLoc;
  });

  // ✅ Fixed: sends date, timeSlot, and auth token
  const handleBook = async () => {
    if (!selectedDate || !selectedSlot) {
      toast.error("Please select a date and time slot");
      return;
    }

    setBooking(true);
    try {
      await api.post("/api/appointments", {
        doctorId: bookingDoctor._id,
        date: selectedDate,
        timeSlot: selectedSlot,
      });

      toast.success(`Appointment booked with ${bookingDoctor.name}!`);
      setBookingDoctor(null);
      setSelectedDate("");
      setSelectedSlot("");
    } catch (err) {
      console.error("Booking error:", err);
      toast.error(err.response?.data?.message || "Failed to book appointment");
    } finally {
      setBooking(false);
    }
  };

  if (loading)
    return <p className="text-white text-center mt-10">Loading doctors...</p>;

  return (
    <div className="container mx-44 text-white bg-dark-600 relative top-10 w-[80rem] p-10 rounded-3xl">
      {/* Hero */}
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
        <Select onValueChange={setSpecializationFilter} defaultValue="all">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Specializations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Specializations</SelectItem>
            {specializations.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={setLocationFilter} defaultValue="all">
          <SelectTrigger className="w-44">
            <SelectValue placeholder="All Locations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            {locations.map((l) => (
              <SelectItem key={l} value={l}>{l}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Doctor Cards */}
      {filteredDoctors.length === 0 ? (
        <p className="text-center text-gray-400 mt-10">No doctors found.</p>
      ) : (
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
                <p className="text-sm mt-2">⏰ Next: {doc.nextAvailable}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {doc.languages?.map((lang, i) => (
                    <span key={i} className="bg-dark-600 px-2 py-1 text-xs rounded-md">
                      {lang}
                    </span>
                  ))}
                </div>
                <Button
                  className="w-full mt-4 bg-primary-blue-600"
                  onClick={() => setBookingDoctor(doc)}
                >
                  Book Appointment
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* ✅ Booking Modal */}
      {bookingDoctor && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-800 text-white p-8 rounded-2xl w-[26rem] shadow-2xl">
            <h2 className="text-xl font-bold mb-1">Book Appointment</h2>
            <p className="text-gray-400 mb-6">with Dr. {bookingDoctor.name}</p>

            <label className="block text-sm mb-1">Select Date</label>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-2 mb-4 rounded bg-gray-700 text-white focus:outline-none"
            />

            <label className="block text-sm mb-2">Select Time Slot</label>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`text-xs py-2 rounded-lg border transition ${
                    selectedSlot === slot
                      ? "bg-indigo-600 border-indigo-500"
                      : "bg-gray-700 border-gray-600 hover:bg-gray-600"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setBookingDoctor(null);
                  setSelectedDate("");
                  setSelectedSlot("");
                }}
                className="flex-1 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleBook}
                disabled={booking}
                className="flex-1 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition disabled:opacity-50"
              >
                {booking ? "Booking..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}