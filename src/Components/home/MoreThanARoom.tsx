"use client";

import Image from "next/image";
import Link from "next/link"; // 👈 Link import করা হলো
import { ShieldCheck, CreditCard, ThumbsUp, Users } from "lucide-react";

export default function MoreThanARoom() {
  return (
    <section className="py-20 bg-[#effdf2]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Side: Image with overlay */}
          <div className="relative w-full h-100 lg:h-125 rounded-3xl overflow-hidden shadow-lg group">
            <Image
              src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Family in a cozy room"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* Overlay Card */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-[#196c51]">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">10,000+ Happy Tenants</p>
                  <p className="text-xs text-gray-500">Found their perfect home</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Features */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              More Than a Room, <br />
              <span className="text-[#196c51]">It's a Community.</span>
            </h2>
            <p className="text-gray-500 mb-8 max-w-lg">
              We provide more than just four walls. Experience a seamless renting journey with verified properties, secure payments, and a supportive community.
            </p>

            <div className="space-y-6">
              {/* Feature 1 */}
              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-[#196c51]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Verified Listings</h3>
                  <p className="text-sm text-gray-500 mt-1">Every property and landlord is strictly verified to ensure your safety.</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-[#196c51]">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Secure Payments</h3>
                  <p className="text-sm text-gray-500 mt-1">Pay your rent securely through our integrated Stripe payment gateway.</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-[#196c51]">
                  <ThumbsUp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Easy Booking</h3>
                  <p className="text-sm text-gray-500 mt-1">Apply for your dream home in just a few clicks and get instant updates.</p>
                </div>
              </div>
            </div>

            {/* CTA Button using Next.js Link */}
            <div className="mt-10">
              <Link
                href="/properties"
                className="inline-block bg-[#196c51] hover:bg-[#12503b] text-white px-8 py-3.5 rounded-xl font-bold transition-colors shadow-lg shadow-emerald-900/20 cursor-pointer"
              >
                Start Your Journey Today
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}