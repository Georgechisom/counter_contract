import React from "react";
import { useScaffoldReadContract } from "~~/hooks/scaffold-stark/useScaffoldReadContract";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-stark/useScaffoldWriteContract";

type Props = {counter : any;}
export const DecreaseCounterButton = ({counter} : Props) => {
  

  const { sendAsync, status } = useScaffoldWriteContract({
    contractName: "CounterContract",
    functionName: "decrease_counter",
    args: [],
  });

  const value =  counter? Number(counter) : 0

  const isBusy = status === "pending";
  const isDisabled = isBusy || counter === undefined || counter === 0;
  return (
    <button
      className="btn btn-primary btn-sm"
      onClick={() => sendAsync()}
      disabled={isDisabled}
      title={value <= 0 ? "Counter is already at 0" : undefined}
    >
      {isBusy ? "Decreasing" : "-1"}
    </button>
  );
};
