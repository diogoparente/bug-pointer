import { ConnectButton } from "@rainbow-me/rainbowkit";
import Button from "../button";

const CustomConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
        const ready = mounted;
        const connected = ready && account && chain;
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button color="gradient" size="large" onClick={openConnectModal}>
                    Connect Wallet
                  </Button>
                );
              }
              if (chain.unsupported) {
                return (
                  <Button color="gradient" size="small" onClick={openChainModal}>
                    Wrong network
                  </Button>
                );
              }
              return (
                <Button color="gradient" size="small" onClick={openAccountModal}>
                  {account.displayName}
                  {account.displayBalance ? ` (${account.displayBalance})` : ""}
                </Button>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export { CustomConnectButton as ConnectButton };
