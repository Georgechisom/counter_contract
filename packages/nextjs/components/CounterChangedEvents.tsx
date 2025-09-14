"use client";

import { useScaffoldEventHistory } from "~~/hooks/scaffold-stark/useScaffoldEventHistory";

export const CounterChangedEvents = () => {
  const { data, isLoading, error } = useScaffoldEventHistory({
    contractName: "CounterContract",
    eventName: "CounterChanged",
    fromBlock: 0n,
    watch: true,
    format: true,
  });

  if (error) return <span className="text-error">failed</span>;

  if (isLoading && (!data || data.length === 0))
    return <span>Loading events...</span>;

  return (
    <div className="w-full max-w-xl">
      <div className="font-semibold mb-2">
        <ul className="space-y-2">
          {(data || []).map((e: any, idx: number) => {
            const parsed = e.parsedArgs || {};
            return <li key={e.blockNumber}>{e.args.newValue}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};
