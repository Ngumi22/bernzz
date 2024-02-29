// LoadingSkeleton.js

import React from "react";

export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse grid grid-cols-3 justify-items-center gap-2 items-center">
      <div className="bg-gray-300 h-40 w-1/2 mb-2 size-72"></div>
      <div className="bg-gray-300 h-40 w-1/3 mb-2 size-72"></div>
      <div className="bg-gray-300 h-40 w-3/4 mb-2 size-72"></div>
    </div>
  );
}
