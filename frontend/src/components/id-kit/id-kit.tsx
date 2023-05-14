import { useCallback } from "react";
import { IDKitWidget } from "@worldcoin/idkit";
import type { ISuccessResult } from "@worldcoin/idkit";
import { createWalletClient, custom, http, createPublicClient } from "viem";
import Button from "../button";
import Image from "next/image";
import { polygon } from "viem/chains";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { useAccount } from "wagmi";

const IdKit: React.FC = () => {
  const router = useRouter();

  const { address } = useAccount();

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
        chain: polygon,
        transport: custom(window.ethereum),
      });

      const publicClient = createPublicClient({
        chain: polygon,
        transport: http(),
      });

      const [account] = await walletClient.getAddresses();

      const unpackedProof = ethers.utils.defaultAbiCoder.decode(["uint256[8]"], result.proof)[0];
      const signal = address ?? "0x0000";
      const nullifierHash = BigInt(result.nullifier_hash);
      const merkleRoot = BigInt(result.merkle_root);

      const hashApproval = await walletClient.writeContract({
        account,
        address: "0xb588Bc6453C10e70035dD289D15A7DAd6Ae36B33",
        abi: [
          {
            inputs: [
              {
                internalType: "contract IWorldID",
                name: "_worldId",
                type: "address",
              },
              {
                internalType: "string",
                name: "_appId",
                type: "string",
              },
              {
                internalType: "string",
                name: "_actionId",
                type: "string",
              },
            ],
            stateMutability: "nonpayable",
            type: "constructor",
          },
          {
            inputs: [],
            name: "CannotTransferHackerPass",
            type: "error",
          },
          {
            inputs: [],
            name: "DoesNotHaveHackerPass",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidContest",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidNullifier",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidXpAmount",
            type: "error",
          },
          {
            inputs: [],
            name: "MaxLevelReached",
            type: "error",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "approved",
                type: "address",
              },
              {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
              },
            ],
            name: "Approval",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "operator",
                type: "address",
              },
              {
                indexed: false,
                internalType: "bool",
                name: "approved",
                type: "bool",
              },
            ],
            name: "ApprovalForAll",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: false,
                internalType: "uint256",
                name: "_fromTokenId",
                type: "uint256",
              },
              {
                indexed: false,
                internalType: "uint256",
                name: "_toTokenId",
                type: "uint256",
              },
            ],
            name: "BatchMetadataUpdate",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: false,
                internalType: "uint256",
                name: "_tokenId",
                type: "uint256",
              },
            ],
            name: "MetadataUpdate",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
              },
              {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
              },
            ],
            name: "Transfer",
            type: "event",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "to",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
              },
            ],
            name: "approve",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "owner",
                type: "address",
              },
            ],
            name: "balanceOf",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
              },
            ],
            name: "getApproved",
            outputs: [
              {
                internalType: "address",
                name: "",
                type: "address",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "owner",
                type: "address",
              },
              {
                internalType: "address",
                name: "operator",
                type: "address",
              },
            ],
            name: "isApprovedForAll",
            outputs: [
              {
                internalType: "bool",
                name: "",
                type: "bool",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "",
                type: "address",
              },
            ],
            name: "levelOfHacker",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "name",
            outputs: [
              {
                internalType: "string",
                name: "",
                type: "string",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
              },
            ],
            name: "ownerOf",
            outputs: [
              {
                internalType: "address",
                name: "",
                type: "address",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "from",
                type: "address",
              },
              {
                internalType: "address",
                name: "to",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
              },
            ],
            name: "safeTransferFrom",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "from",
                type: "address",
              },
              {
                internalType: "address",
                name: "to",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
              },
              {
                internalType: "bytes",
                name: "data",
                type: "bytes",
              },
            ],
            name: "safeTransferFrom",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "operator",
                type: "address",
              },
              {
                internalType: "bool",
                name: "approved",
                type: "bool",
              },
            ],
            name: "setApprovalForAll",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "bytes4",
                name: "interfaceId",
                type: "bytes4",
              },
            ],
            name: "supportsInterface",
            outputs: [
              {
                internalType: "bool",
                name: "",
                type: "bool",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "symbol",
            outputs: [
              {
                internalType: "string",
                name: "",
                type: "string",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "",
                type: "address",
              },
            ],
            name: "tokenIdOfHacker",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
              },
            ],
            name: "tokenURI",
            outputs: [
              {
                internalType: "string",
                name: "",
                type: "string",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "from",
                type: "address",
              },
              {
                internalType: "address",
                name: "to",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
              },
            ],
            name: "transferFrom",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "_hacker",
                type: "address",
              },
              {
                internalType: "address",
                name: "_factory",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "_earnedXp",
                type: "uint256",
              },
            ],
            name: "updateHackerXp",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "signal",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "root",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "nullifierHash",
                type: "uint256",
              },
              {
                internalType: "uint256[8]",
                name: "proof",
                type: "uint256[8]",
              },
            ],
            name: "verifyAndMint",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "",
                type: "address",
              },
            ],
            name: "xpOfHacker",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
        ] as const,
        functionName: "verifyAndMint",
        args: [signal, merkleRoot, nullifierHash, unpackedProof],
      });

      await publicClient.waitForTransactionReceipt({ hash: hashApproval });

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
      app_id="app_f0ee5ffa82140c8ab56ccdf4d1c635bb"
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
