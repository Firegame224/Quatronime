import React from "react";

export default function loading() {
  return (
    <div className="w-full h-screen items-center justify-center flex flex-col">
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-[#9e1313] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
      <h1 className="text-[#9e1313] text-xl ">Loading</h1>
    </div>
  );
}
