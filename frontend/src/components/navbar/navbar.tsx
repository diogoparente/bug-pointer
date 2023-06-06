import Link from "next/link";
import { ConnectButton } from "../connect-button";
import { FadingLine } from "../lines";
import Image from "next/image";
import { Network, Alchemy } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { cn } from "@/utils/utils";

const config = {
  apiKey: "c1DyHzZUq26hycFCJTXg2oCnP-kur0Iy",
  network: Network.MATIC_MAINNET,
};

function Navbar() {
  const { address } = useAccount();

  const [levelInfo, setLevelInfo] = useState("");

  const alchemy = new Alchemy(config);

  useEffect(() => {
    const fetchNFTS = async () => {
      const ownedNFTsBasis = (await alchemy.nft.getNftsForOwner(address ?? "")).ownedNfts;
      return ownedNFTsBasis;
    };
    fetchNFTS().then((ownedNFTs) => {
      const filteredNFTs = ownedNFTs.filter(
        (nft) => nft.contract.address.toLowerCase() === "0x6Fcd41fF1f24CbEF51E492fB4B63c56aBf2B2c14".toLowerCase()
      );
      if (filteredNFTs.length > 0 && filteredNFTs[0].rawMetadata?.attributes?.[0].value) {
        setLevelInfo("Hacker - Level " + filteredNFTs[0].rawMetadata?.attributes[0].value ?? "x");
      } else {
        setLevelInfo("No Hacker Pass");
      }
    });
  }, [address]);

  return (
    <nav className="relative flex w-full items-center justify-between px-5 py-2">
      <Link href="/">
        <Image alt="bug-pointer logo" src={"/logo.png"} height={75} width={75} />
      </Link>
      <div className="flex flex-row items-center gap-4">
        <p className={cn("font-semibold text-white", levelInfo === "No Hacker Pass" && "text-red-600")}>{levelInfo}</p>
        <ConnectButton />
      </div>
      <FadingLine className="absolute bottom-0 left-0" />
    </nav>
  );
}

export { Navbar };
