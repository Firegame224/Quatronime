import React from "react";
export default function LoadingPage() {
  return (
        <div className="flex flex-col justify-center items-center text-center h-screen gap-3">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-secondary motion-reduce:animate-[spin_1.5s_linear_infinite] text-[#fc0b03]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
          <h1 className="text-white text-xl font-mono text-center md:text-2xl">
            Loading
          </h1>
        </div>
  );
}
