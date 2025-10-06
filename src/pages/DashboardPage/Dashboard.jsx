import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import Button from "../../components/button";
import Card from "../../components/card";
import { Link } from "react-router-dom";
import axios from "axios";

import { FaDna, FaHeartbeat } from "react-icons/fa";
import { FaPlus, FaAngleDown } from "react-icons/fa6";
import { GiHealthNormal } from "react-icons/gi";
import { MdBloodtype } from "react-icons/md";

import girlImg from "../../assets/girl.png";
import Mycalendar from "../../components/Mycalender";
import Graphs from "../../components/Graphs";

export default function Dashboard() {
  const [currentMonth] = useState(() => {
    const today = new Date();
    const options = { month: "long", year: "numeric" };
    return today.toLocaleDateString("en-US", options);
  });

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // User state (from backend)
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("⚠️ No token found in localStorage");
          return;
        }

        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data);
      } catch (error) {
        console.error(
          "Error fetching user:",
          error.response?.data || error.message
        );
      }
    };

    fetchUser();
  }, []);

  // Symptom sliders state
  const [symptoms, setSymptoms] = useState({
    pain: 0,
    flow: 0,
    energy: 0,
  });

  const handleSymptomChange = (symptom, value) => {
    setSymptoms((prev) => ({ ...prev, [symptom]: value }));
  };

  return (
    <div className="w-full me-[23rem] px-2 relative top-10 text-white">
      {/* ---------- HEADER ---------- */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-primary_hard text-sm">
            {formattedDate.split(",")[0]},
            <span className="text-primary-text-100">
              {" "}
              {formattedDate.split(",")[1].trim()}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost">Test Report History</Button>
          <Link to={"/test"}>
            <Button>+ Add New Test</Button>
          </Link>
          <Bell className="w-6 h-6 text-slate-400" />
        </div>
      </div>

      {/* ---------- WELCOME CARD ---------- */}
      <Card className="relative bg-primary_hard h-40 p-6 mt-28 my-5 rounded-[2rem]">
        <div className="absolute bottom-0 left-0">
          <img
            src={girlImg}
            alt="Doctor illustration"
            className="object-contain h-[16rem]"
          />
        </div>
        <div className="flex items-center mt-5 me-10 justify-end">
          <div>
            <h2 className="text-4xl mb-3">
              {user ? (
                <>
                  Welcome,{" "}
                  <span className="font-bold">
                    {user.firstName} {user.lastName}
                  </span>
                </>
              ) : (
                "Welcome"
              )}
            </h2>
            <p className="text-indigo-200 text-xl flex justify-end">
              Have a nice day
            </p>
          </div>
        </div>
      </Card>

      {/* ---------- ALL SECTIONS AFTER WELCOME ---------- */}
      <div className="mt-10">
        {/* ---------- REPORTS SECTION ---------- */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold">Report</h2>
          <h2 className="text-sm font-thin me-5 flex gap-2 items-center">
            This month
            <FaAngleDown className="size-4 text-gray-300" />
          </h2>
        </div>

        <div className="grid ms-1 grid-cols-2 md:grid-cols-5 gap-6 mb-8">
          <Card className="bg-secondary_dark flex justify-center">
            <div className="flex flex-col p-2">
              <FaDna className="bg-indigo-600 p-4 mb-3 rounded-2xl mx-auto w-16 h-16" />
              <span className="text-slate-400 mb-2 mx-auto">Hormone</span>
              <span className="text-2xl font-bold mx-auto">18</span>
            </div>
          </Card>

          <Card className="bg-secondary_dark flex justify-center">
            <div className="flex flex-col p-2">
              <FaHeartbeat className="bg-cyan-400 p-4 mb-3 rounded-2xl mx-auto w-16 h-16" />
              <span className="text-slate-400 mb-2 mx-auto">Pelvic US</span>
              <span className="text-2xl font-bold mx-auto">10</span>
            </div>
          </Card>

          <Card className="bg-secondary_dark flex justify-center">
            <div className="flex flex-col p-2">
              <MdBloodtype className="bg-pink-600 p-4 mb-3 rounded-2xl mx-auto w-16 h-16" />
              <span className="text-slate-400 mb-2 mx-auto">Sugar</span>
              <span className="text-2xl font-bold mx-auto">80</span>
            </div>
          </Card>

          <Card className="bg-secondary_dark flex justify-center">
            <div className="flex flex-col p-2">
              <GiHealthNormal className="bg-blue-600 p-4 mb-3 rounded-2xl mx-auto w-16 h-16" />
              <span className="text-slate-400 mb-2 mx-auto">Thyroid</span>
              <span className="text-2xl font-bold mx-auto">3</span>
            </div>
          </Card>

          <Card className="border-dashed border-2 cursor-pointer border-primary_hard p-4 rounded-2xl">
            <div className="flex justify-center items-center h-full">
              <FaPlus className="size-9 text-primary_hard" />
            </div>
          </Card>
        </div>

        {/* ---------- MINI CALENDAR SECTION ---------- */}
        <Card className="bg-secondary_dark p-6 rounded-2xl mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">{currentMonth}</h3>
            <div className="flex gap-2">
              <Button variant="ghost">←</Button>
              <Button variant="ghost">→</Button>
            </div>
          </div>
          <Mycalendar />
        </Card>

        {/* ---------- GRAPHS ---------- */}
        <Graphs />

        {/* ---------- OUR COMPLETE SOLUTION ---------- */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center text-indigo-300 mb-6">
            Our Complete Solution
          </h2>
          <p className="text-center text-slate-400 mb-10">
            Everything you need to manage PCOD & PCOS in one place
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="bg-secondary_dark p-6 text-center">
              <div className="text-3xl mb-4">📅</div>
              <h3 className="font-semibold">Smart Cycle & Symptom Tracking</h3>
            </Card>
            <Card className="bg-secondary_dark p-6 text-center">
              <div className="text-3xl mb-4">🥗</div>
              <h3 className="font-semibold">PCOS Nutrition Plans</h3>
            </Card>
            <Card className="bg-secondary_dark p-6 text-center">
              <div className="text-3xl mb-4">👩‍⚕️</div>
              <h3 className="font-semibold">Specialist Network</h3>
            </Card>
            <Card className="bg-secondary_dark p-6 text-center">
              <div className="text-3xl mb-4">🤝</div>
              <h3 className="font-semibold">Supportive Community</h3>
            </Card>
          </div>
        </div>

        {/* ---------- REAL RESULTS ---------- */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center text-indigo-300 mb-6">
            Real Results from Real Women
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <Card className="bg-secondary_dark p-6">
              <h3 className="text-4xl font-bold text-indigo-400">89%</h3>
              <p className="text-slate-400">
                Reported improved cycle regularly
              </p>
            </Card>
            <Card className="bg-secondary_dark p-6">
              <h3 className="text-4xl font-bold text-indigo-400">92%</h3>
              <p className="text-slate-400">
                Reported improved energy & mood
              </p>
            </Card>
            <Card className="bg-secondary_dark p-6">
              <h3 className="text-4xl font-bold text-indigo-400">94%</h3>
              <p className="text-slate-400">Felt better hormonal balance</p>
            </Card>
          </div>
        </div>

        {/* ---------- TODAY'S SYMPTOMS ---------- */}
        <div className="mt-16 mb-20">
          <h2 className="text-2xl font-bold text-center text-indigo-300 mb-6">
            Today’s Symptoms
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Menstrual Cramps", level: "high" },
              { label: "Abdominal Bloating", level: "medium" },
              { label: "Fatigue & Tiredness", level: "medium" },
              { label: "Headache", level: "low" },
              { label: "Mood Changes", level: "high" },
              { label: "Acne Breakouts", level: "low" },
              { label: "Food Cravings", level: "medium" },
              { label: "Sleep Issues", level: "medium" },
            ].map((symptom, idx) => (
              <Card key={idx} className="bg-secondary_dark p-4 text-center">
                <h3 className="font-semibold">{symptom.label}</h3>
                <p
                  className={`mt-2 text-sm ${
                    symptom.level === "high"
                      ? "text-red-400"
                      : symptom.level === "medium"
                      ? "text-yellow-400"
                      : "text-green-400"
                  }`}
                >
                  {symptom.level}
                </p>
              </Card>
            ))}
          </div>

          {/* Stateful Pain & Flow */}
          <Card className="mt-10 bg-secondary_dark p-6 rounded-2xl">
            <h3 className="text-xl font-semibold mb-4">Pain & Flow Levels</h3>
            <div className="space-y-6">
              <div>
                <label className="block mb-1">Pain Level (0-10)</label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={symptoms.pain}
                  onChange={(e) =>
                    handleSymptomChange("pain", Number(e.target.value))
                  }
                  className="w-full accent-pink-500"
                />
                <p className="text-sm text-gray-400">{symptoms.pain} / 10</p>
              </div>

              <div>
                <label className="block mb-1">Flow Intensity (0-5)</label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={symptoms.flow}
                  onChange={(e) =>
                    handleSymptomChange("flow", Number(e.target.value))
                  }
                  className="w-full accent-indigo-500"
                />
                <p className="text-sm text-gray-400">{symptoms.flow} / 5</p>
              </div>

              <div>
                <label className="block mb-1">Energy Level (0-10)</label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={symptoms.energy}
                  onChange={(e) =>
                    handleSymptomChange("energy", Number(e.target.value))
                  }
                  className="w-full accent-green-500"
                />
                <p className="text-sm text-gray-400">{symptoms.energy} / 10</p>
              </div>
            </div>
          </Card>

          {/* ---------- HOW ARE YOU FEELING TODAY ---------- */}
          <Card className="mt-10 bg-secondary_dark p-6 rounded-2xl">
            <h3 className="text-xl font-semibold mb-4">How are you feeling today?</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              {["Excellent", "Good", "Okay", "Low", "Anxious"].map((feeling, idx) => (
                <Card
                  key={idx}
                  className="p-4 bg-primary_dark cursor-pointer hover:bg-primary_hard transition"
                >
                  <div className="text-2xl mb-2">
                    {idx === 0 ? "😊" : idx === 1 ? "🙂" : idx === 2 ? "😐" : idx === 3 ? "😔" : "😟"}
                  </div>
                  <p>{feeling}</p>
                </Card>
              ))}
            </div>
          </Card>

          {/* ---------- THIS WEEK'S PROGRESS ---------- */}
          <Card className="mt-10 bg-secondary_dark p-6 rounded-2xl">
            <h3 className="text-xl font-semibold mb-6">This Week's Progress</h3>
            <div className="space-y-6">
              {[
                { label: "Symptom Management", value: 78 },
                { label: "Mood Stability", value: 85 },
                { label: "Overall Wellness", value: 82 },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.label}</span>
                    <span>{item.value}%</span>
                  </div>
                  <div className="w-full bg-primary_dark rounded-full h-2">
                    <div
                      className="bg-indigo-400 h-2 rounded-full"
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <Button className="bg-indigo-600 px-6 py-2 rounded-xl">+ Save Today's Health Data</Button>
            </div>
          </Card>

          {/* ---------- HEALTH INSIGHTS ---------- */}
          <Card className="mt-10 bg-secondary_dark p-6 rounded-2xl">
            <h3 className="text-xl font-semibold mb-6">Health Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {[
                { label: "Symptom Management", value: 78, change: "+5% from last week", color: "text-green-400" },
                { label: "Mood Stability", value: 85, change: "+12% from last week", color: "text-green-400" },
                { label: "Overall Wellness", value: 82, change: "+10% from last week", color: "text-green-400" },
              ].map((insight, idx) => (
                <Card key={idx} className="bg-primary_dark p-4">
                  <h3 className="text-3xl font-bold text-indigo-400">{insight.value}%</h3>
                  <p className="text-slate-400">{insight.label}</p>
                  <p className={`text-sm mt-1 ${insight.color}`}>{insight.change}</p>
                </Card>
              ))}
            </div>
          </Card>

          {/* ---------- RECENT ACHIEVEMENTS ---------- */}
          <Card className="mt-10 bg-secondary_dark p-6 rounded-2xl">
            <h3 className="text-xl font-semibold mb-6">Recent Achievements</h3>
            <div className="space-y-4">
              {[
                { text: "7-day symptom tracking streak", badge: "Today" },
                { text: "Improved sleep pattern", badge: "This week" },
                { text: "Completed nutrition goals", badge: "Yesterday" },
              ].map((ach, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-3 bg-primary_dark rounded-xl"
                >
                  <span>{ach.text}</span>
                  <span className="text-xs px-2 py-1 bg-indigo-500 rounded-full">{ach.badge}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* ---------- HEALTH TRENDS SUMMARY ---------- */}
          <Card className="mt-10 bg-secondary_dark p-6 rounded-2xl mb-20">
            <h3 className="text-xl font-semibold mb-6">Health Trends Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <Card className="bg-primary_dark p-4">
                <h3 className="font-bold">Symptoms Improving</h3>
                <p className="text-green-400">+15% from last month</p>
              </Card>
              <Card className="bg-primary_dark p-4">
                <h3 className="font-bold">Sleep Quality</h3>
                <p className="text-slate-400">8.2 / 10</p>
              </Card>
              <Card className="bg-primary_dark p-4">
                <h3 className="font-bold">Stress Level</h3>
                <p className="text-slate-400">3.4 / 10</p>
              </Card>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
