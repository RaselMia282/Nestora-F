"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function OwnerCTA() {
  return (
    <section className="py-20 bg-[#effdf2]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col lg:flex-row">
          
          {/* Left Content */}
          <div className="p-10 lg:p-16 lg:w-1/2 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              Your Property Deserves <br />
              <span className="text-[#196c51]">The Right Tenants.</span>
            </h2>
            <p className="text-gray-500 mb-8">
              List your property on Nestora and reach thousands of verified tenants. Manage applications, track payments, and grow your rental business effortlessly.
            </p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-[#196c51]" /> Verified Tenant Backgrounds
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-[#196c51]" /> Automated Rent Collection
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-[#196c51]" /> Dedicated Owner Dashboard
              </li>
            </ul>

            <div>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 bg-[#196c51] hover:bg-[#12503b] text-white px-8 py-3.5 rounded-xl font-bold transition-colors shadow-lg shadow-emerald-900/20"
              >
                List Your Property <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:w-1/2 relative min-h-[300px] lg:min-h-full bg-gray-100">
            <Image
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Property Owner"
              fill
              className="object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
}