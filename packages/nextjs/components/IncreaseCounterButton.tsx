"use client";

import { useScaffoldWriteContract } from "~~/hooks/scaffold-stark/useScaffoldWriteContract";

export const IncreaseCounterButton = () => {
  const { sendAsync, status } = useScaffoldWriteContract({
    contractName: "CounterContract",
    functionName: "increase_counter",
    args: [],
  });

  return (
    <button
      aria-label="Increase counter"
      className="btn btn-primary btn-lg flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 shadow-md hover:scale-105 hover:from-blue-500 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-transform duration-200 text-black mx-auto"
      onClick={() => sendAsync()}
      disabled={status === "pending"}
    >
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
      {status === "pending" ? "Increasing" : "Increase counter"}
    </button>
  );
};
