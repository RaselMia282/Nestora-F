import React from "react";

import Image from "next/image";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldCheck, CheckCircle2, Star, MapPin } from "lucide-react";
import HeroImg from "../../../public/hero.png";

const Hero = () => {
  return (
    <section className=" py-12 lg:py-20 px-3 sm:px-6 lg:px-8 overflow-hidden border-b-4 border-amber-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left Column: Content */}
        <div className="space-y-6">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full border border-emerald-200">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>Zero Broker Fees • Verified Identities</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
            Find a place you&apos;ll love to call{" "}
            <span className="text-emerald-700 underline decoration-emerald-300 underline-offset-4">
              home
            </span>
            .
          </h1>

          {/* Description */}
          <p className="text-slate-600 text-base sm:text-lg max-w-xl leading-relaxed">
            Discover verified homes, compatible roommates, and hassle-free
            renting — all unified within institutional-grade escrow protection.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href="/rooms">
              <Button className="bg-emerald-800 hover:bg-emerald-900 text-white px-7 py-3.5 rounded-xl font-semibold shadow-md transition">
                Explore Homes
              </Button>
            </Link>
            <Link href="/register">
              <Button
                variant="outline"
                className="border-slate-300 hover:bg-slate-100 text-slate-700 px-7 py-3.5 rounded-xl font-semibold transition"
              >
                Explore Rooms
              </Button>
            </Link>
          </div>

          {/* Key Metrics / Highlights */}
          <div className="pt-6 border-t border-slate-200/80 space-y-3">
            <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-600 font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>$15M+ Deposit Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>100% ID & Background Checked</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 font-medium">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>
                <strong className="text-slate-900">4.9/5</strong> Tenant
                Satisfaction
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Image with Floating Cards */}
        <div className="relative">
          {/* Main Image Container */}
          <div className="relative w-full h-95 sm:h-120 lg:h-130 rounded-3xl overflow-hidden shadow-2xl border border-slate-200/60">
            <Image
              src={HeroImg}
              alt="Modern Living Room"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Top Floating Badge */}
          <div className="absolute -top-4 left-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
              ✓
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">
                Verified Property
              </p>
              <p className="text-[10px] text-slate-500">
                Physical Inspection Done
              </p>
            </div>
          </div>

          {/* Right Floating Badge (Compatibility) */}
          <div className="absolute top-1/2 -right-4 sm:-right-6 -translate-y-1/2 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 max-w-52.5 hidden sm:block">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-full border-2 border-emerald-600 flex items-center justify-center text-xs font-extrabold text-emerald-700">
                92%
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-emerald-700 tracking-wider">
                  High Compatibility
                </span>
                <h4 className="text-xs font-bold text-slate-800 leading-tight">
                  Quiet Hours Synced
                </h4>
              </div>
            </div>
            <p className="text-[10px] text-slate-500 pl-1">
              Early Riser • Remote Tech
            </p>
          </div>

          {/* Bottom Floating Pill */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-md border border-slate-200 flex items-center gap-2 text-xs font-semibold text-slate-700 whitespace-nowrap">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available Now • Instant Tour Today</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
