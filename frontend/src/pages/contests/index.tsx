import { SubHeader } from "@/components/text";
import { Page } from "@/components/page";
import { ContestCard } from "@/components/contest-card";

const Contests = () => {
  const contests: Contest[] = [
    {
      contestAddress: "0x123",
      name: "Ethereum Contest",
      overview:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
      scope:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
      outOfScope:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
      links:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
      prize: "35000 USD",
      startAt: "1683986458000",
      closeAt: "1687999958000",
      submittedVulnerabilities: [],
      filteredVulnerabilities: [],
    },
    {
      contestAddress: "0x123",
      name: "Ethereum Contest 2",
      overview:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
      scope:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
      outOfScope:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
      links:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
      prize: "40000 USD",
      startAt: "1679986458000",
      closeAt: "1687129958000",
      submittedVulnerabilities: [],
      filteredVulnerabilities: [],
    },
  ];

  return (
    <Page>
      <main className="flex w-full flex-1 flex-col items-center justify-start p-10">
        <SubHeader className="mb-8 w-full text-left text-mainGreen">Contests</SubHeader>
        {contests.map((contest) => (
          <ContestCard contest={contest} key={contest.contestAddress} mode="hacker" />
        ))}
      </main>
    </Page>
  );
};

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};

export default Contests;
