import React from "react";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-stark/useScaffoldWriteContract";

type Props = { counter: any };
export const DecreaseCounterButton = ({ counter }: Props) => {
  const { sendAsync, status } = useScaffoldWriteContract({
    contractName: "CounterContract",
    functionName: "decrease_counter",
    args: [],
  });

  const value = counter ? Number(counter) : 0;

  const isBusy = status === "pending";
  const isDisabled = isBusy || counter === undefined || counter === 0;
  return (
    <button
      aria-label="Decrease counter"
      className="btn btn-primary btn-lg flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 shadow-md hover:scale-105 hover:from-blue-500 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-transform duration-200 text-black mx-auto"
      onClick={() => sendAsync()}
      disabled={isDisabled}
      title={value <= 0 ? "Counter is already at 0" : undefined}
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
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5" />
      </svg>
      {isBusy ? "Decreasing" : "Decrease Counter"}
    </button>
  );
};
