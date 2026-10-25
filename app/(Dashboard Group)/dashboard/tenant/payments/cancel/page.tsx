"use client";

import Link from "next/link";
import { XCircle, ArrowRight } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full text-center">
        
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-10 h-10 text-red-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Cancelled</h1>
        <p className="text-gray-500 mb-8">
          Your payment process was cancelled. No charges were made to your account.
        </p>

        <div className="space-y-3">
          <Link 
            href="/dashboard/tenant/payments"
            className="w-full bg-[#196c51] hover:bg-[#12503b] text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            Try Again <ArrowRight className="w-4 h-4" />
          </Link>
          <Link 
            href="/"
            className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 py-3 rounded-lg font-medium transition-colors flex items-center justify-center cursor-pointer"
          >
            Back to Home
          </Link>
        </div>
        
      </div>
    </div>
  );
}