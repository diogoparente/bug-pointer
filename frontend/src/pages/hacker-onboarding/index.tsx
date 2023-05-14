import { Paragraph, SubHeader } from "@/components/text";
import { Page } from "@/components/page";
import IdKit from "@/components/id-kit";
import { Network, Alchemy } from "alchemy-sdk";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAccount } from "wagmi";

const config = {
  apiKey: "c1DyHzZUq26hycFCJTXg2oCnP-kur0Iy",
  network: Network.MATIC_MAINNET,
};

const HackerOnboarding = () => {
  const router = useRouter();
  const { address } = useAccount();

  const alchemy = new Alchemy(config);

  useEffect(() => {
    const fetchNFTS = async () => {
      const ownedNFTsBasis = (await alchemy.nft.getNftsForOwner(address ?? "")).ownedNfts;
      return ownedNFTsBasis;
    };
    fetchNFTS().then((ownedNFTs) => {
      if (
        ownedNFTs.some(
          (nft) => nft.contract.address.toLowerCase() === "0x6Fcd41fF1f24CbEF51E492fB4B63c56aBf2B2c14".toLowerCase()
        )
      ) {
        router.push("/contests");
      }
    });
  }, [address]);

  return (
    <Page isMandatoryConnection>
      <main className="flex flex-1 flex-col items-center justify-center gap-8">
        <SubHeader>Claim your Hacker Pass!</SubHeader>
        <Paragraph>Validate your identity with WorldCoin and mint your Hacker Pass to start!</Paragraph>
        <IdKit />
      </main>
    </Page>
  );
};

export default HackerOnboarding;
