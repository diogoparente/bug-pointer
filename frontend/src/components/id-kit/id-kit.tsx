import { useCallback } from "react";
import { IDKitWidget } from "@worldcoin/idkit";
import type { ISuccessResult } from "@worldcoin/idkit";
import Button from "../button";
import Image from "next/image";

const IdKit: React.FC = () => {
  const handleProof = useCallback((result: ISuccessResult) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 3000);
      // NOTE: Example of how to decline the verification request and show an error message to the user
    });
  }, []);

  const onSuccess = (result: ISuccessResult) => {
    console.log(JSON.stringify(result, null, 4));
  };

  return (
    <IDKitWidget
      action="my_action"
      signal="my_signal"
      onSuccess={onSuccess}
      handleVerify={handleProof}
      app_id="app_8fbcc62110c7fe846b6dd65845167b9c"
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
