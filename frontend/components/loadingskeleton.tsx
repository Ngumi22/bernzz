// LoadingSkeleton.js

import React from "react";

export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse grid grid-cols-5 justify-items-center gap-2 items-center">
      <div className="bg-gray-300 h-40"></div>
      <div className="bg-gray-300 h-40"></div>
      <div className="bg-gray-300 h-40"></div>
      <div className="bg-gray-300 h-40"></div>
      <div className="bg-gray-300 h-40"></div>
    </div>
  );
}
