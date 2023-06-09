import { ContestHeader } from "@/components/contest-header";
import { DefaultBackground } from "@/components/default-background";
import { Page } from "@/components/page";
import { Paragraph } from "@/components/text";
import { FilteredVulnerabilityInfo } from "@/components/vulnerability-info";
import { getContestByAddress } from "@/database/entities";
import { GetServerSideProps } from "next";

type ContestProps = {
  contest: Contest;
};

const MyContest = ({ contest }: ContestProps) => (
  <Page>
    <main className="flex w-full flex-1 flex-col items-center justify-start p-10">
      <DefaultBackground className="flex w-full flex-col gap-8">
        <ContestHeader contest={contest} mode="sponsor" />
        {contest.filteredVulnerabilities?.length ? (
          <div className="flex w-full flex-col items-center justify-between gap-4">
            {contest.filteredVulnerabilities.map((vulnerability) => (
              <FilteredVulnerabilityInfo vulnerability={vulnerability} key={vulnerability.id} />
            ))}
          </div>
        ) : (
          <Paragraph className="mx-auto py-6">No filtered vulnerabilities registred</Paragraph>
        )}
      </DefaultBackground>
    </main>
  </Page>
);

export const getServerSideProps: GetServerSideProps = async (req) => {
  const contest = await getContestByAddress(req.query.address as string);

  return { props: { contest: JSON.parse(JSON.stringify(contest)) } };
};

export default MyContest;
