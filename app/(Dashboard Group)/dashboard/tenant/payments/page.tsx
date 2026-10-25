"use client";

import { useState } from "react";
import {
  CreditCard,
  CheckCircle2,
  Clock,
  ExternalLink,
  Calendar,
} from "lucide-react";
import {
  useGetTenantPayments,
  useCreatePayment,
} from "@/src/features/dashboard/api/tenant-overview";
import Spinner from "@/src/Components/shared/Spinner";

export default function TenantPaymentsPage() {
  const { data: response, isLoading, isError } = useGetTenantPayments();
  const { mutate: payNow } = useCreatePayment();

  // কোন payment এখন প্রক্রিয়াধীন (শুধু সেই row-তে "Processing..." দেখাতে)
  const [payingId, setPayingId] = useState<string | null>(null);

  const payments = response?.data || [];

  const handlePayNow = (paymentId: string, leaseId: string) => {
    if (payingId) return; // একটা চললে আরেকটা শুরু হবে না
    setPayingId(paymentId);

    payNow(leaseId, {
      onError: () => setPayingId(null), // ব্যর্থ হলে আবার চেষ্টা করা যাবে
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load payments.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          My Payments
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage your rent payments and view history.
        </p>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {payments.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <CreditCard className="w-12 h-12 mb-3 text-gray-300" />
                      <p className="text-lg font-medium text-gray-800">
                        No payments found
                      </p>
                      <p className="text-sm mt-1">
                        You have no pending or completed payments.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                payments.map((payment: any) => {
                  const isThisPaying = payingId === payment.id;

                  return (
                    <tr
                      key={payment.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {/* Amount */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-[#196c51]">
                            <CreditCard className="w-4 h-4" />
                          </div>
                          <p className="font-bold text-gray-800">
                            ৳ {payment.amount}
                          </p>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {new Date(payment.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        {payment.status === "COMPLETED" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            <CheckCircle2 className="w-3 h-3" /> Completed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                            <Clock className="w-3 h-3" /> Pending
                          </span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="px-6 py-4 text-right">
                        {payment.status === "PENDING" ? (
                          <button
                            onClick={() =>
                              handlePayNow(payment.id, payment.leaseId)
                            }
                            disabled={isThisPaying}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ml-auto ${
                              isThisPaying
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-[#196c51] hover:bg-[#12503b] text-white cursor-pointer"
                            }`}
                          >
                            {isThisPaying ? "Processing..." : "Pay Now"}
                            {!isThisPaying && (
                              <ExternalLink className="w-4 h-4" />
                            )}
                          </button>
                        ) : (
                          <span className="text-xs text-gray-400 italic">
                            No action required
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}