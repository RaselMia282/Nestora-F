// Spinner.tsx

import React from "react";

interface PremiumSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  label?: string;
}

export default function Spinner({
  size = "md",
  label = "Loading...",
}: PremiumSpinnerProps) {
  
  const sizeMap = {
    sm: "w-6 h-6 border-[2.5px]",
    md: "w-10 h-10 border-3",
    lg: "w-14 h-14 border-4",
    xl: "w-20 h-20 border-[5px]",
  };

  const centerDotSize = {
    sm: "w-1.5 h-1.5",
    md: "w-2.5 h-2.5",
    lg: "w-3.5 h-3.5",
    xl: "w-5 h-5",
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[220px] gap-3">
      <div className="relative flex items-center justify-center">
        
        <div
          className={`${sizeMap[size].split(" ")[0]} ${sizeMap[size].split(" ")[1]} rounded-full bg-emerald-500/20 blur-md absolute animate-pulse`}
        />

        
        <div
          className={`${sizeMap[size]} border-emerald-100 dark:border-emerald-950/40 rounded-full`}
        />

        
        <div
          className={`absolute top-0 left-0 ${sizeMap[size]} border-emerald-600 border-t-transparent border-r-transparent rounded-full animate-spin shadow-sm`}
          role="status"
          aria-label={label}
        />

        
        <div
          className={`${centerDotSize[size]} bg-emerald-600 rounded-full animate-ping opacity-75 absolute`}
        />
        <div
          className={`${centerDotSize[size]} bg-emerald-600 rounded-full absolute shadow-sm`}
        />
      </div>

      
      {label && (
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 tracking-wider uppercase animate-pulse">
          {label}
        </p>
      )}
    </div>
  );
}