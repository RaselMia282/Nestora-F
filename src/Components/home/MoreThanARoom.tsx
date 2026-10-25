"use client";

import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, CreditCard, ThumbsUp, User, CheckCircle2 } from "lucide-react";

import HomeImg from "../../../public/homeimg.png"

export default function MoreThanARoom() {
  return (
    <section className="py-24 bg-[#effdf2]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Side: Image with overlay card */}
          <div className="relative w-full h-[450px] lg:h-[550px] rounded-3xl overflow-hidden shadow-lg">
            <Image
              src={HomeImg}
              alt="People enjoying a comfortable room"
              fill
              className="object-cover"
            />
            
            {/* Overlay Card */}
            <div className="absolute bottom-6 right-6 w-[280px] bg-white p-5 rounded-2xl shadow-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image 
                    src={HomeImg} 
                    alt="Avatar" 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 flex items-center gap-1">
                    Arina Ahmed <CheckCircle2 className="w-3 h-3 text-[#196c51]" />
                  </h4>
                  <p className="text-[10px] text-gray-500">Verified Resident</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1.5 mb-4">
                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-medium px-2 py-1 rounded-md">Tiếng Anh</span>
                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-medium px-2 py-1 rounded-md">Non-Smoker</span>
                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-medium px-2 py-1 rounded-md">Pet Lover</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <button className="bg-gray-50 hover:bg-gray-100 text-gray-700 py-1.5 rounded-md font-medium transition-colors">Age: 24</button>
                <button className="bg-gray-50 hover:bg-gray-100 text-gray-700 py-1.5 rounded-md font-medium transition-colors">Student</button>
              </div>
            </div>
          </div>

          {/* Right Side: Content */}
          <div>
            <h4 className="text-sm font-bold text-[#196c51] uppercase tracking-wider mb-2">Community First</h4>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
              More Than a Room, <br />
              Find Your Kind of People.
            </h2>
            <p className="text-gray-600 mb-8 max-w-lg text-base leading-relaxed">
              Find not just a place to live, but a community to thrive in. We help you find roommates who match your lifestyle and interests.
            </p>

            <div className="space-y-6">
              {/* Feature 1 */}
              <div className="flex gap-4 items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex-shrink-0 w-10 h-10 bg-[#effdf2] rounded-full flex items-center justify-center text-[#196c51]">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Find Your Tribe</h3>
                  <p className="text-xs text-gray-500">Match with people who share your vibe.</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex gap-4 items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex-shrink-0 w-10 h-10 bg-[#effdf2] rounded-full flex items-center justify-center text-[#196c51]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Verified Profiles</h3>
                  <p className="text-xs text-gray-500">All users are verified for your safety.</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex gap-4 items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex-shrink-0 w-10 h-10 bg-[#effdf2] rounded-full flex items-center justify-center text-[#196c51]">
                  <ThumbsUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Shared Interests</h3>
                  <p className="text-xs text-gray-500">Connect over common hobbies and habits.</p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <Link
                href="/rooms"
                className="inline-block bg-[#196c51] hover:bg-[#12503b] text-white px-8 py-3.5 rounded-xl font-bold transition-colors shadow-lg shadow-emerald-900/20"
              >
                Discover Your Nestora Home
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}