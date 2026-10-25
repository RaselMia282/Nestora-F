"use client";

import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function OwnerCTA() {
  return (
    <section className="py-24  overflow-hidden bg-[#effdf2]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Content */}
          <div>
            <p className="text-sm font-bold text-[#196c51] uppercase tracking-wider mb-3">
              OWNER DASHBOARD
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
              Your Property Deserves <br />
              The Right Tenants.
            </h2>
            <p className="text-gray-600 mb-8 max-w-lg text-base leading-relaxed">
              Manage your properties, track tenant applications, and collect rent effortlessly. Get a complete overview of your rental business in one place.
            </p>

            <ul className="space-y-4 mb-10">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#196c51] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-900">Filter Tenant Applications</h4>
                  <p className="text-sm text-gray-500 mt-1">Review and approve tenant profiles with verified NIDs.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#196c51] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-900">Track Rental Income</h4>
                  <p className="text-sm text-gray-500 mt-1">Get real-time updates on rent payments and pending dues.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#196c51] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-900">Automate Rent Collection</h4>
                  <p className="text-sm text-gray-500 mt-1">Integrated with Stripe for secure and automatic monthly payments.</p>
                </div>
              </li>
            </ul>

            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-[#196c51] hover:bg-[#12503b] text-white px-8 py-3.5 rounded-xl font-bold transition-colors shadow-lg shadow-emerald-900/20"
            >
              List Your Property <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Right Side: Dashboard Mockup (CSS UI) */}
          <div className="relative">
            {/* Background Blob for design effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#effdf2] rounded-full blur-3xl -z-10 opacity-70"></div>
            
            {/* Dashboard Card Mockup */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-2xl p-6 w-full max-w-lg mx-auto">
              
              {/* Mockup Header */}
              <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">Owner Overview</h3>
                  <p className="text-xs text-gray-400">Welcome back, Rasel</p>
                </div>
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-400"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                </div>
              </div>

              {/* Mockup Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <p className="text-[10px] text-gray-500 uppercase">Properties</p>
                  <p className="font-bold text-gray-800 text-lg">04</p>
                </div>
                <div className="bg-[#effdf2] p-3 rounded-xl border border-emerald-100">
                  <p className="text-[10px] text-[#196c51] uppercase">Applications</p>
                  <p className="font-bold text-[#196c51] text-lg">12</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <p className="text-[10px] text-gray-500 uppercase">Revenue</p>
                  <p className="font-bold text-gray-800 text-lg">৳ 50k</p>
                </div>
              </div>

              {/* Mockup List */}
              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase mb-3">Recent Applications</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#196c51] flex items-center justify-center font-bold text-xs">RA</div>
                      <div>
                        <p className="text-xs font-bold text-gray-800">Rasel Ahmed</p>
                        <p className="text-[10px] text-gray-500">Room 101 - Cedar Heights</p>
                      </div>
                    </div>
                    <button className="bg-[#196c51] text-white text-[10px] px-2 py-1 rounded cursor-pointer">Approve</button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">SI</div>
                      <div>
                        <p className="text-xs font-bold text-gray-800">Sadia Islam</p>
                        <p className="text-[10px] text-gray-500">Room 102 - Serenity Villa</p>
                      </div>
                    </div>
                    <button className="bg-gray-200 text-gray-600 text-[10px] px-2 py-1 rounded cursor-pointer">Pending</button>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}