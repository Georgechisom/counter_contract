"use client";

import { ConnectedAddress } from "~~/components/ConnectedAddress";
import { CounterChangedEvents } from "~~/components/CounterChangedEvents";
import { CounterValue } from "~~/components/CounterValue";
import { DecreaseCounterButton } from "~~/components/DecreaseCounterButton";
import { IncreaseCounterButton } from "~~/components/IncreaseCounterButton";
import { ResetCounterButton } from "~~/components/ResetCounterButton";
import { SetCounterForm } from "~~/components/SetCounterForm";
import { useScaffoldReadContract } from "~~/hooks/scaffold-stark/useScaffoldReadContract";

const Home = () => {
  const { data, isLoading, error } = useScaffoldReadContract({
    contractName: "CounterContract",
    functionName: "get_counter",
    args: [],
  });
  return (
    <div className="flex items-center flex-col grow pt-10 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Counter App</h1>
        <div className="text-6xl font-mono text-blue-600 mb-6">
          <CounterValue value={data} isLoading={isLoading} error={error} />
        </div>
        <div className="flex justify-center gap-4 mb-6 flex-wrap">
          <DecreaseCounterButton counter={data} />
          <ResetCounterButton />
          <IncreaseCounterButton />
        </div>
        <div className="mt-6">
          <SetCounterForm currentValue={data} />
        </div>
      </div>
      <div className="mt-8 w-full max-w-4xl flex justify-center">
        <CounterChangedEvents />
      </div>
    </div>
  );
};

export default Home;
