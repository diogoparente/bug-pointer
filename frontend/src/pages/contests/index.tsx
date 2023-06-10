import { SubHeader, SubText } from "@/components/text";
import { Page } from "@/components/page";
import { ContestCard } from "@/components/contest-card";
import { getAllContests } from "@/database/entities";
import Head from "next/head";

const Contests = ({ contests }: { contests: Contest[] }) => {
  return (
    <Page>
      <Head>
        <title>{"Bug Pointer | Contests"}</title>
      </Head>
      <main className="flex w-full flex-1 flex-col items-center justify-start p-10">
        <SubHeader className="mb-8 w-full text-left text-mainGreen">Contests</SubHeader>
        {!contests?.length ? (
          <SubText className="py-20">No contests found</SubText>
        ) : (
          contests.map((contest) => <ContestCard contest={contest} key={contest.contestAddress} mode="hacker" />)
        )}
      </main>
    </Page>
  );
};

export const getServerSideProps = async () => {
  const contests = await getAllContests();

  return {
    props: {
      contests: JSON.parse(JSON.stringify(contests)),
    },
  };
};

export default Contests;
