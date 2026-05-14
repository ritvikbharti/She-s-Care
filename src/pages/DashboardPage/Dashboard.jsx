import { useState, useEffect } from "react";
import { Bell, Activity, Calendar, FileText, Wallet, TrendingUp, Heart, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import girlImg from "../../assets/girl.png";
import Mycalendar from "../../components/Mycalender";
import Graphs from "../../components/Graphs";

// ── Tiny helpers ─────────────────────────────────────────────────────────────

function RingChart({ percent, color, size = 120, stroke = 10, label }) {
  const r  = (size - stroke) / 2;
  const cx = size / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (percent / 100) * circumference;
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size}>
        <circle cx={cx} cy={cx} r={r} stroke="#1e293b" strokeWidth={stroke} fill="none" />
        <circle
          cx={cx} cy={cx} r={r}
          stroke={color} strokeWidth={stroke} fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease", transform: "rotate(-90deg)", transformOrigin: "center" }}
        />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
          fill="white" fontSize={size / 5} fontWeight="bold">
          {percent}%
        </text>
      </svg>
      {label && <span className="text-xs text-slate-400">{label}</span>}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub, color }) {
  return (
    <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-5 flex items-center gap-4">
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-slate-400 text-xs">{label}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
        {sub && <p className="text-xs text-slate-500 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [user,         setUser]         = useState(null);
  const [reports,      setReports]      = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [wallet,       setWallet]       = useState({ balance: 0 });
  const [loading,      setLoading]      = useState(true);

  // Symptom mood state (local — can be persisted to backend later)
  const [mood, setMood] = useState(null);
  const [symptoms, setSymptoms] = useState({ pain: 0, flow: 0, energy: 5 });

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", day: "numeric", month: "short", year: "numeric",
  });

  useEffect(() => {
    const loadAll = async () => {
      try {
        const [userRes, reportRes, apptRes, walletRes] = await Promise.allSettled([
          api.get("/api/auth/me"),
          api.get("/api/reports/my"),
          api.get("/api/appointments"),
          api.get("/api/wallet/balance"),
        ]);
        if (userRes.status   === "fulfilled") setUser(userRes.value.data);
        if (reportRes.status === "fulfilled") setReports(reportRes.value.data);
        if (apptRes.status   === "fulfilled") setAppointments(apptRes.value.data);
        if (walletRes.status === "fulfilled") setWallet(walletRes.value.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadAll();
  }, []);

  // Derived stats from real data
  const latestReport   = reports[0] || null;
  const riskPct        = latestReport ? Math.round(latestReport.riskPercentage) : 0;
  const healthScore    = latestReport ? Math.max(0, 100 - riskPct) : null;
  const totalReports   = reports.length;
  const upcomingAppts  = appointments.filter(a => new Date(a.date) >= new Date());
  const detectedCount  = reports.filter(r => r.detected).length;

  const moods = [
    { label: "Great",   emoji: "😊", color: "bg-green-500/20 border-green-500" },
    { label: "Good",    emoji: "🙂", color: "bg-blue-500/20 border-blue-500"  },
    { label: "Okay",    emoji: "😐", color: "bg-yellow-500/20 border-yellow-500" },
    { label: "Low",     emoji: "😔", color: "bg-orange-500/20 border-orange-500" },
    { label: "Anxious", emoji: "😟", color: "bg-red-500/20 border-red-500"   },
  ];

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="w-full me-[23rem] px-4 pb-20 relative top-10 text-white space-y-8">

      {/* ── HEADER ── */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-slate-400 text-sm">{today}</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/report-history">
            <button className="text-sm px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition">
              Report History
            </button>
          </Link>
          <Link to="/test">
            <button className="text-sm px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition">
              + New Test
            </button>
          </Link>
          <Bell className="w-5 h-5 text-slate-400" />
        </div>
      </div>

      {/* ── WELCOME BANNER ── */}
      <div className="relative bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 rounded-3xl h-44 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.1),transparent)]" />
        <div className="absolute bottom-0 left-4">
          <img src={girlImg} alt="" className="h-52 object-contain" />
        </div>
        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-right">
          <p className="text-indigo-200 text-sm">Welcome back</p>
          <h2 className="text-3xl font-bold mt-1">
            {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
          </h2>
          <p className="text-indigo-200 mt-1">
            {latestReport
              ? `Last test: ${new Date(latestReport.createdAt).toLocaleDateString()}`
              : "No tests yet — take your first test!"}
          </p>
        </div>
      </div>

      {/* ── STAT CARDS ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={FileText}  label="Total Reports"      value={totalReports}
          sub={`${detectedCount} detected`}              color="bg-indigo-600" />
        <StatCard icon={Calendar}  label="Upcoming Appts"     value={upcomingAppts.length}
          sub={upcomingAppts[0] ? new Date(upcomingAppts[0].date).toLocaleDateString() : "None booked"}
          color="bg-purple-600" />
        <StatCard icon={Activity}  label="Latest PCOS Risk"   value={`${riskPct}%`}
          sub={latestReport ? (latestReport.detected ? "⚠️ Detected" : "✅ Clear") : "No data"}
          color={riskPct > 50 ? "bg-red-600" : "bg-green-600"} />
        <StatCard icon={Wallet}    label="Wallet Balance"     value={`₹${wallet.balance}`}
          sub="Available balance"                         color="bg-cyan-600" />
      </div>

      {/* ── HEALTH SCORE + RINGS ── */}
      {totalReports > 0 && (
        <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-400" /> Health Overview
          </h2>
          <div className="flex flex-wrap justify-around gap-6">
            <RingChart percent={healthScore ?? 0}   color="#818cf8" label="Health Score" />
            <RingChart percent={Math.max(0,100-riskPct)} color="#34d399" label="Low Risk" />
            <RingChart percent={Math.min(100, totalReports * 20)} color="#f472b6" label="Test Completion" />
            <RingChart percent={upcomingAppts.length > 0 ? 100 : 20} color="#60a5fa" label="Appt. Active" />
          </div>
        </div>
      )}

      {/* ── PCOS RISK TREND (from all reports) ── */}
      {reports.length > 1 && (
        <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-400" /> Your Risk Trend
          </h2>
          <div className="flex items-end gap-2 h-24">
            {reports.slice(-8).reverse().map((r, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className={`w-full rounded-t-lg transition-all ${r.detected ? "bg-red-500" : "bg-green-500"}`}
                  style={{ height: `${Math.max(10, r.riskPercentage)}%` }}
                />
                <span className="text-[10px] text-slate-500">
                  {new Date(r.createdAt).toLocaleDateString("en-US",{month:"short",day:"numeric"})}
                </span>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-3 text-xs text-slate-400">
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-500 rounded-full inline-block"/> PCOS Detected</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full inline-block"/> Clear</span>
          </div>
        </div>
      )}

      {/* ── UPCOMING APPOINTMENTS ── */}
      <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-400" /> Upcoming Appointments
          </h2>
          <Link to="/doctor" className="text-xs text-indigo-400 hover:underline">Book more →</Link>
        </div>
        {upcomingAppts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-slate-400">No upcoming appointments.</p>
            <Link to="/doctor">
              <button className="mt-3 text-sm px-4 py-2 bg-indigo-600 rounded-xl hover:bg-indigo-500 transition">
                Find a Doctor
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingAppts.slice(0, 3).map((appt) => (
              <div key={appt._id}
                className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
                <div>
                  <p className="font-medium">{appt.doctor?.name || "Doctor"}</p>
                  <p className="text-sm text-slate-400">{appt.doctor?.specialization}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-indigo-300">{new Date(appt.date).toLocaleDateString()}</p>
                  <p className="text-xs text-slate-400">{appt.timeSlot}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  appt.status === "booked" ? "bg-green-500/20 text-green-400 border border-green-500/30" :
                  "bg-gray-500/20 text-gray-400"}`}>
                  {appt.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── TODAY'S MOOD ── */}
      <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" /> How are you feeling today?
        </h2>
        <div className="flex gap-3 flex-wrap">
          {moods.map((m) => (
            <button key={m.label} onClick={() => setMood(m.label)}
              className={`flex flex-col items-center gap-1 px-5 py-3 rounded-xl border transition ${
                mood === m.label ? m.color : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}>
              <span className="text-2xl">{m.emoji}</span>
              <span className="text-xs">{m.label}</span>
            </button>
          ))}
        </div>
        {mood && (
          <p className="mt-3 text-sm text-slate-400">
            Recorded: feeling <span className="text-white font-medium">{mood}</span> today ✓
          </p>
        )}
      </div>

      {/* ── SYMPTOM SLIDERS ── */}
      <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-4">Today's Symptom Log</h2>
        <div className="space-y-5">
          {[
            { key: "pain",   label: "Pain Level",       max: 10, color: "accent-pink-500" },
            { key: "flow",   label: "Flow Intensity",   max: 5,  color: "accent-indigo-500" },
            { key: "energy", label: "Energy Level",     max: 10, color: "accent-green-500" },
          ].map(({ key, label, max, color }) => (
            <div key={key}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-300">{label}</span>
                <span className="text-white font-medium">{symptoms[key]} / {max}</span>
              </div>
              <input type="range" min="0" max={max} value={symptoms[key]}
                onChange={(e) => setSymptoms(p => ({ ...p, [key]: +e.target.value }))}
                className={`w-full h-2 rounded-full ${color}`} />
            </div>
          ))}
        </div>
      </div>

      {/* ── CALENDAR ── */}
      <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-4">Cycle Calendar</h2>
        <Mycalendar />
      </div>

      {/* ── GRAPHS ── */}
      <Graphs />

      {/* ── QUICK ACTIONS ── */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Take PCOS Test",   to: "/test",           emoji: "🧪", color: "from-indigo-600 to-purple-600" },
            { label: "Book Doctor",      to: "/doctor",         emoji: "👩‍⚕️", color: "from-purple-600 to-pink-600"  },
            { label: "View Reports",     to: "/report-history", emoji: "📋", color: "from-pink-600 to-rose-600"   },
            { label: "Top-up Wallet",    to: "/wallet",         emoji: "💳", color: "from-cyan-600 to-blue-600"   },
          ].map((action) => (
            <Link key={action.label} to={action.to}>
              <div className={`bg-gradient-to-br ${action.color} p-5 rounded-2xl text-center hover:opacity-90 transition cursor-pointer`}>
                <div className="text-3xl mb-2">{action.emoji}</div>
                <p className="text-sm font-medium">{action.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── PCOS EDUCATION TIPS ── */}
      <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-4">💡 PCOS Health Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Balanced Diet",       tip: "Opt for low-GI foods like oats, lentils and berries to manage insulin resistance common in PCOS.",   icon: "🥗" },
            { title: "Regular Exercise",    tip: "30 minutes of moderate exercise 5× a week can significantly improve hormonal balance and reduce symptoms.", icon: "🏃‍♀️" },
            { title: "Stress Management",   tip: "Cortisol directly worsens PCOS. Try yoga, meditation, or journaling for at least 10 minutes daily.",  icon: "🧘‍♀️" },
            { title: "Sleep Quality",       tip: "Poor sleep disrupts insulin and reproductive hormones. Aim for 7–9 hours every night.",                 icon: "😴" },
            { title: "Track Your Cycle",    tip: "Logging your cycle helps spot irregularities early and gives your doctor crucial data.",               icon: "📅" },
            { title: "Stay Hydrated",       tip: "Drinking enough water supports hormone transport and reduces bloating associated with PCOS.",          icon: "💧" },
          ].map((item, i) => (
            <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/5">
              <div className="text-2xl mb-2">{item.icon}</div>
              <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.tip}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}