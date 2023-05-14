import { useCallback } from "react";
import { IDKitWidget } from "@worldcoin/idkit";
import type { ISuccessResult } from "@worldcoin/idkit";
import { createWalletClient, custom, http, createPublicClient } from "viem";
import { erc721ABI } from "wagmi";
import Button from "../button";
import Image from "next/image";
import { polygonMumbai } from "viem/chains";
import { useRouter } from "next/router";

const IdKit: React.FC = () => {
  const router = useRouter();

  const handleProof = useCallback((result: ISuccessResult) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 3000);
      // NOTE: Example of how to decline the verification request and show an error message to the user
    });
  }, []);

  const onSuccess = async (result: ISuccessResult) => {
    try {
      if (!window.ethereum) return;
      const walletClient = createWalletClient({
        chain: polygonMumbai,
        transport: custom(window.ethereum),
      });

      const publicClient = createPublicClient({
        chain: polygonMumbai,
        transport: http(),
      });

      const [account] = await walletClient.getAddresses();

      // const hashApproval = await walletClient.writeContract({
      //   account,
      //   address: "0xabc",
      //   abi: "ADD",
      //   functionName: "verifyAndMint",
      //   args: [result.proof],
      // });

      // await publicClient.waitForTransactionReceipt({ hash: hashApproval });

      router.push("/hacker-onboarding/success");
    } catch (error) {
      router.push("/hacker-onboarding/error");
    }
  };

  return (
    <IDKitWidget
      action="my_action"
      signal="my_signal"
      onSuccess={onSuccess}
      handleVerify={handleProof}
      app_id="app_staging_a0f9e01942310da27b55dca73ff2173c"
    >
      {({ open }) => (
        <Button color="green" className="mt-6 w-fit" size="large" onClick={open}>
          <div className="flex flex-row items-center justify-between gap-2">
            Claim Hacker Pass
            <Image src="/worldcoin-logo.png" width={40} height={40} alt="WorldCoin Logo" />
          </div>
        </Button>
      )}
    </IDKitWidget>
  );
};

export { IdKit };
