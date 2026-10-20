"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useSubmitFullApplication } from "../api/application";



interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetId: string;
  type: "room" | "property";
}

export default function ApplyModal({ isOpen, onClose, targetId, type }: ApplyModalProps) {
  const router = useRouter();
  
  // ✅ হুক কল করা হলো
  const { mutate: submitFullApp, isPending } = useSubmitFullApplication();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nidNumber, setNidNumber] = useState("");
  const [nidFront, setNidFront] = useState<File | null>(null);
  const [nidBack, setNidBack] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nidFront || !nidBack) {
      alert("Please upload both NID images.");
      return;
    }

    // ✅ হুক দিয়ে ডেটা পাঠানো
    submitFullApp(
      {
        roomId: type === "room" ? targetId : undefined,
        propertyId: type === "property" ? targetId : undefined,
        name,
        phone,
        nidNumber,
        nidFront,
        nidBack,
      },
      {
        onSuccess: () => {
          onClose(); // Modal Close
          router.push("/dashboard/applications"); // Redirect to Dashboard
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md shadow-lg overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
          <h2 className="text-lg font-bold text-gray-800">Tenant Application</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:border-[#196c51] outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:border-[#196c51] outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">NID Number</label>
            <input type="text" required value={nidNumber} onChange={(e) => setNidNumber(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:border-[#196c51] outline-none" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">NID Front</label>
              <input type="file" required accept="image/*" onChange={(e) => setNidFront(e.target.files?.[0] || null)} className="w-full text-xs" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">NID Back</label>
              <input type="file" required accept="image/*" onChange={(e) => setNidBack(e.target.files?.[0] || null)} className="w-full text-xs" />
            </div>
          </div>

          <button type="submit" disabled={isPending} className="w-full bg-[#196c51] text-white py-3 rounded-lg font-semibold hover:bg-[#12503b] transition-colors disabled:opacity-50 mt-2">
            {isPending ? "Submitting..." : "Submit Application"}
          </button>
        </form>

      </div>
    </div>
  );
}