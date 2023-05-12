import "@rainbow-me/rainbowkit/styles.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import MainLayout from "@/layout/mainLayout";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [polygonMumbai],
  [alchemyProvider({ apiKey: "_tTXIJS7JyhhrbZGe8AN4ZjFsxutih17" }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "NFT Renter dApp",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
