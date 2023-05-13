import { useState } from "react";
import { ContestHeader } from "@/components/contest-header";
import { DefaultBackground } from "@/components/default-background";
import { Page } from "@/components/page";
import * as Tabs from "@radix-ui/react-tabs";
import { SubmittedVulnerabilityInfo } from "@/components/vulnerability-info";
import { RegularLine } from "@/components/lines";
import { SubmitHandler, useForm } from "react-hook-form";
import { DiscardedVulnerabilities } from "@/components/discarded-vulnerabilities";
import { FilteredVulnerabilityItem } from "@/components/filtered-vulnerability-item";

type ContestProps = {
  contest: Contest;
};

const subVulnerabilityMock: SubmittedVulnerability[] = [
  {
    name: "Vulnerability 1",
    proofOfConcept:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    id: "1",
    ownerAddress: "0x123",
  },
  {
    name: "Vulnerability 2",
    proofOfConcept:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    id: "2",
    ownerAddress: "0x123",
  },
  {
    name: "Vulnerability 3",
    proofOfConcept:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    id: "3",
    ownerAddress: "0x123",
  },
];

const mock = {
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
  submittedVulnerabilities: subVulnerabilityMock,
  filteredVulnerabilities: [],
};

type ExtendedSubmittedVulnerability = SubmittedVulnerability & {
  status: "Reviewed" | "Discarded" | "Pending";
};

interface FilteredBugInput {
  name: string;
  proofOfConcept: string;
}

const defaultValues: FilteredBugInput = {
  name: "",
  proofOfConcept: "",
};

const ReviewVulnerabilities = ({ contest = mock }: ContestProps) => {
  const [submittedVulnerabilities, setSubmittedVulnerabilities] = useState<ExtendedSubmittedVulnerability[]>(
    contest.submittedVulnerabilities.map((vulnerability) => ({ ...vulnerability, status: "Pending" }))
  );

  const [filteredVulnerabilities, setFilteredVulnerabilities] = useState<FilteredVulnerability[]>([]);

  const { register, handleSubmit } = useForm<FilteredBugInput>({ defaultValues });

  const onSubmitHandler = (values: FilteredBugInput) => {
    //Call backend here
  };

  return (
    <Page isMandatoryConnection>
      <main className="flex w-full flex-1 flex-col items-center justify-start p-10">
        <DefaultBackground className="flex w-full flex-col gap-8">
          <ContestHeader contest={contest} mode="hacker" />
          <Tabs.Root className="flex w-full flex-col" defaultValue="tab1">
            <Tabs.List className="flex w-full flex-row justify-center gap-32">
              <Tabs.Trigger
                className="w-fit select-none items-center justify-center px-8 py-4 text-lg leading-none outline-none first:rounded-tl-md last:rounded-tr-md data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black"
                value="tab1"
              >
                Submitted Vulnerabilities
              </Tabs.Trigger>
              <Tabs.Trigger
                className="w-fit select-none items-center justify-center px-8 py-4 text-lg leading-none outline-none first:rounded-tl-md last:rounded-tr-md data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black"
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
                  <FilteredVulnerabilityItem vulnerability={vulnerability} key={vulnerability.id} />
                ))}
              </div>
              <RegularLine />
              <DiscardedVulnerabilities
                submittedVulnerabilities={submittedVulnerabilities}
                setSubmittedVulnerabilities={setSubmittedVulnerabilities}
              />
              <RegularLine />
            </Tabs.Content>
          </Tabs.Root>
        </DefaultBackground>
      </main>
    </Page>
  );
};

export default ReviewVulnerabilities;
