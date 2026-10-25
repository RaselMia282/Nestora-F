"use client";

import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: "Rasel Ahmed",
      location: "Uttara, Dhaka",
      text: "Nestora made finding my first apartment incredibly easy. The NID verification process gave me peace of mind, and the payment system is super secure. Highly recommended!",
      rating: 5,
    },
    {
      id: 2,
      name: "Sadia Islam",
      location: "Gulshan, Dhaka",
      text: "I found a perfect room with amazing roommates through this platform. The dashboard is so clean and easy to use. Best rental experience I have had so far.",
      rating: 5,
    },
    {
      id: 3,
      name: "Tanvir Hossain",
      location: "Agrabad, Chattogram",
      text: "As a property owner, listing my houses and managing tenant applications has never been easier. The Stripe integration for rent collection is a game-changer.",
      rating: 4,
    },
  ];

  return (
    // 👇 Section background changed to light green
    <section className="py-24 bg-[#effdf2]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Real Experiences from Our Community
          </h2>
          <p className="text-gray-500 mt-4">
            Do not just take our word for it. Here is what our tenants and property owners have to say.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              // 👇 Card background changed to white
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm relative hover:shadow-md transition-shadow"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="w-12 h-12 text-[#196c51]" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6 relative z-10">
                {review.text}
              </p>

              {/* User Info */}
              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-[#196c51] text-white flex items-center justify-center font-bold text-lg">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{review.name}</h4>
                  <p className="text-xs text-gray-500">{review.location}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}