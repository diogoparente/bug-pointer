import { Paragraph, SubHeader } from "@/components/text";
import { Input } from "@/components/input";
import { Page } from "@/components/page";
import { TextArea } from "@/components/text-area";
import Button from "@/components/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { createWalletClient, custom, http, createPublicClient } from "viem";
import { polygon } from "viem/chains";
import Head from "next/head";

type ContestFormValues = {
  contestAddress: string;
  overview: string;
  scope: string;
  outOfScope: string;
  links: string;
  name: string;
  startAtTime: string;
  startAtDay: Date;
  closeAtTime: string;
  closeAtDay: Date;
  prize: string;
};

const defaultValues: ContestFormValues = {
  contestAddress: "",
  overview: "",
  scope: "",
  outOfScope: "",
  links: "",
  name: "",
  startAtTime: "",
  startAtDay: new Date(),
  closeAtTime: "",
  closeAtDay: new Date(),
  prize: "",
};

const factoryAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_hackerPassNFT",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "LINK_ADDR",
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
    inputs: [],
    name: "MAX_DURATION",
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
    name: "MIN_TOTAL_BOUNTY",
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
    name: "USDC_ADDR",
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
        name: "",
        type: "address",
      },
    ],
    name: "activeSponsors",
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
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_ongoingContestDuration",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_waitingJudgeSubmissionDuration",
        type: "uint256",
      },
    ],
    name: "createContest",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
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
    name: "deployedContests",
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
    name: "hackerPassNFT",
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
        name: "_sponsor",
        type: "address",
      },
    ],
    name: "inactivateSponsor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
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
        name: "_newOwner",
        type: "address",
      },
    ],
    name: "setOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const CreateContest = () => {
  const { register, handleSubmit } = useForm<ContestFormValues>({ defaultValues });

  const { address } = useAccount();

  const router = useRouter();

  const onSubmitHandler = async (values: ContestFormValues) => {
    // if (!window.ethereum) return;
    // const walletClient = createWalletClient({
    //   chain: polygon,
    //   transport: custom(window.ethereum),
    // });

    // const publicClient = createPublicClient({
    //   chain: polygon,
    //   transport: http(),
    // });

    // const [account] = await walletClient.getAddresses();

    // const hashApproval = await walletClient.writeContract({
    //   account,
    //   address: "0xf0A76b1546e2D79050CD2873e0b4d59Ab756Cf52",
    //   abi: factoryAbi,
    //   functionName: "createContest",
    //   args: [BigInt(parseFloat(values.prize) * 10 ** 6), BigInt(172800), BigInt(900)],
    // });

    // await publicClient.waitForTransactionReceipt({ hash: hashApproval });

    const [startHours, startMinutes] = values.startAtTime.split(":");
    values.startAtDay.setHours(parseFloat(startHours), parseFloat(startMinutes));

    const [closeHours, closeMinutes] = values.closeAtTime.split(":");
    values.closeAtDay.setHours(parseFloat(closeHours), parseFloat(closeMinutes));

    const filteredBody = {
      contestAddress: "0x" + Math.random().toString().substring(2, 6),
      sponsor: address ?? "",
      overview: values.overview,
      scope: values.scope,
      outOfScope: values.outOfScope,
      links: values.links,
      name: values.name,
      startAt: new Date(values.startAtDay),
      closeAt: new Date(values.closeAtDay),
      prize: values.prize,
    };

    await fetch("/api/contest", { method: "POST", body: JSON.stringify(filteredBody) });
    router.push("/my-contests");
  };

  return (
    <Page isMandatoryConnection>
      <Head>
        <title>{"Bug Pointer | Create Contest"}</title>
      </Head>
      <main className="flex flex-1 flex-col items-center justify-center gap-8 py-24">
        <SubHeader>First Step</SubHeader>
        <Paragraph className="max-w-[90%] text-center">
          Add the basic information about your Contest. During the first two days of the Contest the judge will be
          selected
        </Paragraph>
        <form className="flex w-3/4 flex-col gap-6" onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="flex flex-row items-center justify-between">
            <Input color="purple" type="text" label="Contest Name" className="flex-1" register={register} name="name" />
          </div>
          <div className="flex flex-row items-center justify-between gap-8">
            <Input color="purple" type="time" label="Start Time" register={register} name="startAtTime" />
            <Input color="purple" type="date" label="Start Day" register={register} name="startAtDay" />
            <Input color="purple" type="time" label="End Time" register={register} name="closeAtTime" />
            <Input color="purple" type="date" label="End Day" register={register} name="closeAtDay" />
          </div>
          <TextArea
            color="purple"
            label="Overview"
            className="min-h-[14rem] flex-1"
            register={register}
            name="overview"
          />
          <TextArea color="purple" label="Scope" className="min-h-[14rem] flex-1" register={register} name="scope" />
          <TextArea
            color="purple"
            label="Out Of Scope"
            className="min-h-[14rem] flex-1"
            register={register}
            name="outOfScope"
          />
          <TextArea
            color="purple"
            label="Relevant Links"
            className="min-h-[14rem] flex-1"
            register={register}
            name="links"
          />
          <Input
            color="purple"
            type="text"
            label="Bounty Value(USDC)"
            className="flex-1"
            register={register}
            name="prize"
          />
          <div className="flex w-full flex-col items-center justify-between">
            <Paragraph className="mt-6 text-center text-base">
              In order to create a contest you have to lock the bounty value
            </Paragraph>
            <Button color="purple" type="submit" size="large" className="mx-auto mt-4 w-fit">
              Create Contest
            </Button>
          </div>
        </form>
      </main>
    </Page>
  );
};

export default CreateContest;
