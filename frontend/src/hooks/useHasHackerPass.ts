import { HACKER_PASS_ADDRESS, MATIC_CONFIG } from "@/consts";
import { Alchemy } from "alchemy-sdk";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";

const useHasHackerPass = () => {
  const { address } = useAccount();
  const [hasHackerPass, setHasHackerPass] = useState(false);
  const [hackerPassLevel, setHackerPassLevel] = useState<number | undefined>(undefined);

  useEffect(() => {
    const fetchNFTS = async (_address: string) => {
      return (await alchemy.nft.getNftsForOwner(_address)).ownedNfts;
    };

    const alchemy = new Alchemy(MATIC_CONFIG);

    if (!address) {
      setHasHackerPass(false);
      setHackerPassLevel(undefined);
      return;
    }
    fetchNFTS(address).then((ownedNFTs) => {
      const filteredNFTs = ownedNFTs.filter(
        (nft) => nft.contract.address.toLowerCase() === HACKER_PASS_ADDRESS.toLowerCase()
      );
      if (filteredNFTs.length > 0 && filteredNFTs[0].rawMetadata?.attributes?.[0].value) {
        setHasHackerPass(true);
        setHackerPassLevel(parseInt(filteredNFTs[0].rawMetadata?.attributes?.[0].value));
        return;
      }
      setHasHackerPass(false);
      setHackerPassLevel(undefined);
    });
  }, [address]);

  return { hasHackerPass, hackerPassLevel };
};

export default useHasHackerPass;
