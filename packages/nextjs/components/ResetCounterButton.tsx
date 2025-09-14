"use client";

import { useMemo, useState } from "react";
import { useDeployedContractInfo } from "~~/hooks/scaffold-stark";
import { useScaffoldReadContract } from "~~/hooks/scaffold-stark/useScaffoldReadContract";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-stark/useScaffoldWriteContract";
import { useAccount } from "~~/hooks/useAccount";

const RESET_COST = 10n ** 18n;

export const ResetCounterButton = () => {
  const [approval, setApproval] = useState(true);
  const [resets, setResets] = useState(false);

  const { sendAsync, status } = useScaffoldWriteContract({
    contractName: "CounterContract",
    functionName: "reset_counter",
    args: [],
  });

  const { address: accountAddress } = useAccount();
  const { data: counterContract } = useDeployedContractInfo("CounterContract");

  const { data: allowance, refetch: refetchAllowance } =
    useScaffoldReadContract({
      contractName: "Strk",
      functionName: "allowance",
      args: [accountAddress, counterContract?.address],
      watch: true,
    });

  const { sendAsync: approve, status: approveStatus } =
    useScaffoldWriteContract({
      contractName: "Strk",
      args: [counterContract?.address, RESET_COST],
      functionName: "approve",
    });

  const { sendAsync: reset, status: resetStatus } = useScaffoldWriteContract({
    contractName: "CounterContract",
    functionName: "reset_counter",
  });

  const hasEnoughAllowance = useMemo(() => {
    if (!allowance) return false;
    const allowanceBN = BigInt(allowance as any);
    return allowanceBN >= RESET_COST;
  }, [allowance]);

  const handleApprove = async () => {
    await approve({ args: [counterContract?.address, RESET_COST] });
    // Refetch allowance after approval
    setTimeout(() => refetchAllowance(), 2000);
  };

  const handleReset = async () => {
    await reset();
  };

  const isApproving = approveStatus === "pending";
  const isResetting = resetStatus === "pending";

  function changeApproveButton() {
    handleApprove();
    setApproval(false);
    setResets(true);
  }

  function changeResetButton() {
    handleReset();

    setApproval(true);
    setResets(false);
  }

  return (
    <div>
      <button
        aria-label="Approve counter"
        className={
          approval
            ? "btn btn-primary btn-lg flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 shadow-md hover:scale-105 hover:from-blue-500 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-transform duration-200 text-black mx-auto"
            : "hidden"
        }
        onClick={() => changeApproveButton()}
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
        {status === "pending" ? "Approving" : "Approve Reset"}
      </button>

      <button
        aria-label="Reset counter"
        className={
          resets
            ? "btn btn-primary btn-lg flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 shadow-md hover:scale-105 hover:from-blue-500 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-transform duration-200 text-black mx-auto"
            : "hidden"
        }
        onClick={() => changeResetButton()}
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
        {status === "pending" ? "Resetting" : "Reset Counter"}
      </button>
    </div>
  );
};
