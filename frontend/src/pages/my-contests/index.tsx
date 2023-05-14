import { SubHeader } from "@/components/text";
import { Page } from "@/components/page";
import { ContestCard } from "@/components/contest-card";
import CustomLink from "@/components/custom-link";
import { getContestsBySponsor } from "@/database/entities";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const Contests = () => {
  const { address } = useAccount();

  const [contests, setContests] = useState<Contest[]>([]);

  useEffect(() => {
    const getContests = async () => {
      return await getContestsBySponsor(address ?? "");
    };
    getContests().then((contestsResp) => {
      const parsedResp = JSON.parse(JSON.stringify(contestsResp));
      console.log({ parsedResp });
      setContests(parsedResp);
    });
  }, []);

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
