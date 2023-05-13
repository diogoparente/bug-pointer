import { SubHeader } from "@/components/text";
import { Page } from "@/components/page";
import { ContestCard } from "@/components/contest-card";
import CustomLink from "@/components/custom-link";

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
    <Page isMandatoryConnection>
      <main className="flex w-full flex-1 flex-col items-center justify-start p-10">
        <SubHeader className="mb-8 w-full text-left text-mainPurple">My Contests</SubHeader>
        {contests.map((contest) => (
          <ContestCard contest={contest} key={contest.contestAddress} mode="sponsor" />
        ))}
        <CustomLink type="button" size="large" color="purple" href="/create-contest">
          Publish New Contest
        </CustomLink>
      </main>
    </Page>
  );
};

export default Contests;
