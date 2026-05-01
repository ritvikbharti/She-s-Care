import React from "react";
import { Card, CardContent } from "../../components/Card1";
import { Button } from "../../components/button1";

export default function Team() {
  const teamSections = [
    {
      title: "Research Paper Team",
      members: [
        {
          name: "Nitish Kumar Jha",
          role: "Lead Researcher",
          desc: "Worked on problem statement, system architecture, and final research documentation.",
        },
        {
          name: "Monika Paidi",
          role: "Data Analyst",
          desc: "Handled dataset collection, preprocessing, and result evaluation.",
        },
      ],
    },
    {
      title: "Reserach Paper",
      members: [
        {
          name: "Hari sai singulri",
          role: "Researcher",
          desc: "Contributed to literature review, experiment design, and paper writing.",
        },
        {
          name: "Pragati tripathi",
          role: "Researcher",
          desc: "Assisted in data analysis, result interpretation, and paper formatting.",
        },
      ],
    },
    {
      title: "Figma Design Team",
      members: [
        {
          name: "Monika paidi",
          role: "UI/UX Designer",
          desc: "Designed complete UI flows and user experience using Figma.",
        },
      ],
    },
    {
      title: "Development Team",
      members: [
        {
          name: "Hari sai singulri",
          role: "Frontend Developer",
          desc: "Built responsive UI using React and Tailwind.",
        },
        {
          name: "Pragati tripathi",
          role: "Frontend Developer",
          desc: "Developed APIs and handled database integration.",
        },
      ],
    },
    {
      title: "Metor Guider",
      members: [
        {
          name: "Souhardya Bose",
          role: "Guiding Mentor throughout the project",
          desc: "#",
        },

      ],
    },

  ];

  return (
  <div className="container mx-44 text-white bg-dark-600 relative top-10 w-[80rem] p-10 rounded-3xl">

    {/*  Header (Enhanced but consistent) */}
    <div className="text-center mb-12">
      <h1 className="text-4xl font-extrabold">
        Meet Our <span className="text-green-400">Team</span>
      </h1>
      <p className="text-muted-foreground mt-3 text-lg">
        The minds behind research, design & development 
      </p>
    </div>
    
    {/* Floating Research Card (Glass but theme-safe) */}
   <div className="fixed bottom-8 right-8 z-50 animate-slideIn">

  <div className="relative group">

    {/*  Pulse Glow */}
    <div className="absolute inset-0 bg-green-500 opacity-30 blur-2xl rounded-2xl animate-pulse"></div>

    {/* Card */}
    <div className="relative bg-dark-400/90 backdrop-blur-md border border-green-400/30 p-5 rounded-2xl shadow-xl w-72 hover:scale-105 transition duration-300">

      {/*  NEW Badge */}
      <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 py-1 rounded-full animate-bounce">
        Hey Explore our Research Paper!
      </span>

      <h3 className="text-green-400 font-semibold text-sm flex items-center gap-2">
        📄 Research Paper
      </h3>

      <p className="text-xs text-muted-foreground mt-1">
        AI-based Smart Healthcare System
      </p>

      <button
        onClick={() => window.open("https://drive.google.com/file/d/10cjlcmEDgLiwKYaxn4jDzt6gspJxhD7f/view?usp=drive_link", "_blank")}
        className="mt-3 w-full bg-green-500 hover:bg-green-600 py-2 rounded-lg text-sm font-medium"
      >
        View / Download
      </button>
    </div>
  </div>
</div>

    {/* Figma Button */}
    <div className="flex justify-center mb-12">
      <button
        onClick={() => window.open("https://www.figma.com/design/35aLcfbZwAJIwVZCIxxiqI/Pcod-Web?node-id=0-1&t=FYkj4M11n7yvxU5q-1", "_blank")}
        className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-full shadow-lg hover:scale-105 transition duration-300 font-medium"
      >
        🎨 View Figma Design
      </button>
    </div>

    {/* Sections */}
    <div className="space-y-12">
      {teamSections.map((section, index) => (
        <div key={index}>

          {/* Section Title */}
          <h2 className="text-2xl font-semibold mb-6 text-green-400 flex items-center gap-2">
            <span className="w-1 h-6 bg-green-400 rounded"></span>
            {section.title}
          </h2>

          {/* Cards */}
          <div className="grid grid-cols-3 gap-6">
            {section.members.map((member, i) => (
              <div
                key={i}
                className="bg-dark-400 p-6 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition duration-300 border border-transparent hover:border-green-400/30"
              >
                
                {/* Avatar */}
                <div className="w-11 h-11 flex items-center justify-center rounded-full bg-green-500 text-black font-bold mb-3">
                  {member.name.charAt(0)}
                </div>

                {/* Info */}
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-sm text-green-300">{member.role}</p>

                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {member.desc}
                </p>

              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);
}