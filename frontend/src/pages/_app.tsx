import "@rainbow-me/rainbowkit/styles.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import MainLayout from "@/layout/mainLayout";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { Source_Code_Pro } from "@next/font/google";

const { chains, provider } = configureChains(
  [polygonMumbai],
  [alchemyProvider({ apiKey: "_tTXIJS7JyhhrbZGe8AN4ZjFsxutih17" }), publicProvider()]
);

const source_code_pro = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-source-code-pro",
});

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
        <MainLayout className={source_code_pro.variable + " font-sourceCodePro"}>
          <Component {...pageProps} />
        </MainLayout>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
