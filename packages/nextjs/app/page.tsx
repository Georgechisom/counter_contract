"use client";

import { ConnectedAddress } from "~~/components/ConnectedAddress";
import { CounterChangedEvents } from "~~/components/CounterChangedEvents";
import { CounterValue } from "~~/components/CounterValue";
import { DecreaseCounterButton } from "~~/components/DecreaseCounterButton";
import { IncreaseCounterButton } from "~~/components/IncreaseCounterButton";
import { SetCounterForm } from "~~/components/SetCounterForm";
import { useScaffoldReadContract } from "~~/hooks/scaffold-stark/useScaffoldReadContract";

const Home = () => {
  const { data, isLoading, error } = useScaffoldReadContract({
    contractName: "CounterContract",
    functionName: "get_counter",
    args: [],
  });
  return (
    <div className="flex items-center flex-col grow pt-10">
      <div className="text-lg">
        Counter :{" "}
        <CounterValue value={data} isLoading={isLoading} error={error} />
        <IncreaseCounterButton />
        <DecreaseCounterButton data={data} />
      </div>
      <div className="mt-4">
        <SetCounterForm currentValue={data} />
      </div>
      <div className="mt-6 w-full flex justify-center">
        <CounterChangedEvents />
      </div>
    </div>
  );
};

export default Home;
