import { Bell, Calendar, Home, Mail, Settings, Users } from 'lucide-react';
import { useState } from 'react';
import Button from '../../components/button';
import Card from '../../components/card';
export default function Dashboard() {
  const [currentMonth] = useState("January 2021");

  return (
    <div className="min-h-screen w-[65rem] mt-10 ms-[10rem] me-10 text-white ">
      {/* Main Content */}
      <div className="">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-primary_hard text-sm">Thursday, <span className='text-primary-text-100'>28 Jan 2021</span></p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost">Appointment History</Button>
            <Button >+ Add Patient</Button>
            <Bell className="w-6 h-6 text-slate-400" />
          </div>
        </div>

        {/* Welcome Card */}
        <Card className="bg-primary_hard p-6 my-5 rounded-[2rem]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome, Dr. Shabrina</h2>
              <p className="text-indigo-200">Have a nice day at work</p>
            </div>
            <div className="w-32 h-32 relative">
              <img src="/placeholder.svg" alt="Doctor illustration" className="object-contain" />
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-10 mb-8">
          <Card className="bg-secondary_dark p-4 rounded-xl">
            <div className="flex flex-col">
              <span className="text-slate-400 mb-2">Patient</span>
              <span className="text-2xl font-bold">1032</span>
            </div>
          </Card>
          <Card className="bg-secondary_dark p-4 rounded-xl">
            <div className="flex flex-col">
              <span className="text-slate-400 mb-2">Consultation</span>
              <span className="text-2xl font-bold">207</span>
            </div>
          </Card>
          <Card className="bg-secondary_dark p-4 rounded-xl">
            <div className="flex flex-col">
              <span className="text-slate-400 mb-2">Inject</span>
              <span className="text-2xl font-bold">128</span>
            </div>
          </Card>
          <Card className="bg-secondary_dark p-4 rounded-xl">
            <div className="flex flex-col">
              <span className="text-slate-400 mb-2">Surgery</span>
              <span className="text-2xl font-bold">48</span>
            </div>
          </Card>
        </div>

        {/* Calendar Section */}
        <Card className="bg-secondary_dark p-6 rounded-xl mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">{currentMonth}</h3>
            <div className="flex gap-2">
              <Button variant="ghost">←</Button>
              <Button variant="ghost">→</Button>
            </div>
          </div>
          {/* Event List */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="bg-indigo-600 rounded-lg p-3 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Check Up</span>
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-slate-300" />
                    <div className="w-6 h-6 rounded-full bg-slate-400" />
                  </div>
                </div>
              </div>
              <div className="bg-pink-600 rounded-lg p-3 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Surgery</span>
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-slate-300" />
                    <div className="w-6 h-6 rounded-full bg-slate-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>        
      </div>
    </div>
  );
}
