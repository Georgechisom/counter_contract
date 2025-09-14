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
    <div className="flex items-center flex-col grow pt-10 px-4 w-full ">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-xl shadow-lg p-8 max-w-3xl w-full md:w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Counter App</h1>
        <div className="text-6xl font-mono mb-6 text-black">
          <CounterValue value={data} isLoading={isLoading} error={error} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 justify-center gap-4 mb-6">
          <IncreaseCounterButton />
          <ResetCounterButton />
          <DecreaseCounterButton counter={data} />
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
