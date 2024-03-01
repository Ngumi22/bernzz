import React from "react";

export default function CategoryLists() {
  return (
    <div className="hidden md:grid grid-cols-1 gap-4 place-content-center h-96 w-1/5">
      <div className="overflow-hidden border p-2 flex justify-center items-center">
        <img src="/lap1.jpg" className="object-cover overflow-hidden" alt="" />
      </div>
      <div className="overflow-hidden border p-2 flex justify-center items-center">
        <img src="/lap1.jpg" className="object-cover overflow-hidden" alt="" />
      </div>
    </div>
  );
}
