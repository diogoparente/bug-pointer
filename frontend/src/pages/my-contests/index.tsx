import { SubHeader } from "@/components/text";
import { Page } from "@/components/page";
import { ContestCard } from "@/components/contest-card";
import CustomLink from "@/components/custom-link";
import { useAccount } from "wagmi";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Contests = () => {
  const { address } = useAccount();

  const fetchMyContests = ({ queryKey }: any) => {
    const sponsorParam = queryKey[1];
    return axios.get(`/api/fetchRentedNFTs?sponsor=${sponsorParam}`).then((response) => {
      return response.data.rentedNFTs as Contest[];
    });
  };

  const { data: contests } = useQuery({
    queryKey: ["myContests", address],
    queryFn: fetchMyContests,
    refetchOnWindowFocus: false,
    initialData: [],
  });

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
