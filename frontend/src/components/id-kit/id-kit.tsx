import { useCallback } from "react";
import { IDKitWidget } from "@worldcoin/idkit";
import type { ISuccessResult } from "@worldcoin/idkit";

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
      app_id="app_staging_61309e8182a36a339791554b6353570e"
      // walletConnectProjectId="get_this_from_walletconnect_portal"
    >
      {({ open }) => (
        <div
          className={
            "h-19 w-98 flex cursor-pointer flex-row items-center justify-center gap-3 rounded-3xl border border-gray-600 bg-black bg-opacity-80 p-6"
          }
          onClick={open}
        >
          <p className="text-5xl font-bold leading-7">WorldId</p>
        </div>
      )}
    </IDKitWidget>
  );
};

export { IdKit };
