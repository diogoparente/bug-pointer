import { useState } from "react";
import { ContestHeader } from "@/components/contest-header";
import { DefaultBackground } from "@/components/default-background";
import { Page } from "@/components/page";
import * as Tabs from "@radix-ui/react-tabs";
import { SubmittedVulnerabilityInfo } from "@/components/vulnerability-info";
import { RegularLine } from "@/components/lines";
import Button from "@/components/button";
import { DiscardedVulnerabilities } from "@/components/discarded-vulnerabilities";
import { FilteredVulnerabilityItem } from "@/components/filtered-vulnerability-item";
import { CreateFilteredVulnerability } from "@/components/create-filtered-vulnerability";
import { getContestByAddress, getSubmittedVulnerabilitiesByContestAddress } from "@/database/entities";
import { GetServerSideProps } from "next";
import Head from "next/head";

type ContestProps = {
  contest: Contest;
  vulnerabilities: SubmittedVulnerability[];
};

const ReviewVulnerabilities = ({ contest, vulnerabilities }: ContestProps) => {
  const [submittedVulnerabilities, setSubmittedVulnerabilities] = useState<ExtendedSubmittedVulnerability[]>(
    vulnerabilities ? vulnerabilities.map((vulnerability) => ({ ...vulnerability, status: "Pending" })) : []
  );

  const [filteredVulnerabilities, setFilteredVulnerabilities] = useState<
    WithoutId<FilteredVulnerabilityWithSubmitted>[]
  >([]);

  return (
    <Page isMandatoryConnection>
      <Head>
        <title>{"Bug Pointer | Review Vulnerabilities"}</title>
      </Head>
      <main className="flex w-full flex-1 flex-col items-center justify-start p-10">
        <DefaultBackground className="flex w-full flex-col gap-8">
          <ContestHeader contest={contest} mode="hacker" />
          <Button
            color="green"
            size="large"
            className="mx-auto w-fit"
            disabled={submittedVulnerabilities.some((vul) => vul.status === "Pending")}
          >
            Submit Review
          </Button>
          <Tabs.Root className="flex w-full flex-col" defaultValue="tab1">
            <Tabs.List className="flex w-full flex-row justify-center gap-32">
              <Tabs.Trigger
                className="w-fit select-none items-center justify-center border-none px-8 py-4 text-lg leading-none outline-none first:rounded-tl-md last:rounded-tr-md data-[state=closed]:opacity-70 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative"
                value="tab1"
              >
                Submitted Vulnerabilities
              </Tabs.Trigger>
              <Tabs.Trigger
                className="w-fit select-none items-center justify-center border-none px-8 py-4 text-lg leading-none outline-none first:rounded-tl-md last:rounded-tr-md data-[state=closed]:opacity-70 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative"
                value="tab2"
              >
                Reviewed Vulnerabilities
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content className="grow rounded-b-md p-5 outline-none" value="tab1">
              <div className="flex flex-col gap-4">
                {submittedVulnerabilities.map((vulnerability) => (
                  <SubmittedVulnerabilityInfo
                    vulnerability={vulnerability}
                    status={vulnerability.status}
                    key={vulnerability.id}
                  />
                ))}
              </div>
            </Tabs.Content>
            <Tabs.Content className="flex grow flex-col gap-8 rounded-b-md p-5 outline-none" value="tab2">
              <div className="flex flex-col gap-4">
                {filteredVulnerabilities.map((vulnerability) => (
                  <FilteredVulnerabilityItem
                    vulnerability={vulnerability}
                    key={vulnerability.name + vulnerability.proofOfConcept}
                  />
                ))}
              </div>
              {filteredVulnerabilities.length > 0 && <RegularLine />}
              <DiscardedVulnerabilities
                submittedVulnerabilities={submittedVulnerabilities}
                setSubmittedVulnerabilities={setSubmittedVulnerabilities}
              />
              {submittedVulnerabilities.some((vul) => vul.status === "Pending") && (
                <>
                  <RegularLine />
                  <CreateFilteredVulnerability
                    submittedVulnerabilities={submittedVulnerabilities}
                    setSubmittedVulnerabilities={setSubmittedVulnerabilities}
                    setFilteredVulnerabilities={setFilteredVulnerabilities}
                  />
                </>
              )}
            </Tabs.Content>
          </Tabs.Root>
        </DefaultBackground>
      </main>
    </Page>
  );
};

export const getServerSideProps: GetServerSideProps = async (req) => {
  const contest = await getContestByAddress(req.query.address as string);
  const vulnerabilities = await getSubmittedVulnerabilitiesByContestAddress(req.query.address as string);

  return {
    props: {
      contest: JSON.parse(JSON.stringify(contest)),
      vulnerabilities: JSON.parse(JSON.stringify(vulnerabilities)),
    },
  };
};

export default ReviewVulnerabilities;
