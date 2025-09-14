"use client";

import { useScaffoldWriteContract } from "~~/hooks/scaffold-stark/useScaffoldWriteContract";

export const ResetCounterButton = () => {
  const { sendAsync, status } = useScaffoldWriteContract({
    contractName: "CounterContract",
    functionName: "reset_counter",
    args: [],
  });

  return (
    <button
      aria-label="Reset counter"
      className="btn btn-primary btn-sm flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 shadow-md hover:scale-105 hover:from-blue-500 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-transform duration-200"
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
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 4v6h6M20 20v-6h-6"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 10a8 8 0 0114 4.5M20 14a8 8 0 01-14-4.5"
        />
      </svg>
      {status === "pending" ? "Resetting" : "Reset"}
    </button>
  );
};
