"use client";

import { Search, ShieldCheck, Key } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Explore Properties",
      description: "Browse through our wide range of verified properties and rooms to find the one that fits your needs.",
    },
    {
      icon: ShieldCheck,
      title: "Verify & Apply",
      description: "Complete your profile, verify your NID, and submit your application with just a few clicks.",
    },
    {
      icon: Key,
      title: "Move In",
      description: "Once approved, pay your rent securely online and get ready to move into your new home.",
    },
  ];

  return (
    <section className="py-20 bg-[#effdf2]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">How Nestora Works</h2>
          <p className="text-gray-500 mt-4">
            Finding your next home is simple. Just follow these three easy steps to get started.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Connector Line (Desktop only) */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[2px] bg-emerald-100 -z-10"></div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center bg-white p-6 rounded-2xl">
                <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6 border-8 border-white shadow-sm">
                  <Icon className="w-10 h-10 text-[#196c51]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 max-w-xs">{step.description}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}