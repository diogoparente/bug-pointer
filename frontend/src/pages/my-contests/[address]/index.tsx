import { ContestHeader } from "@/components/contest-header";
import { DefaultBackground } from "@/components/default-background";
import { Page } from "@/components/page";
import { FilteredVulnerabilityInfo } from "@/components/vulnerability-info";

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

const filteredVulnerabilitiesMock: FilteredVulnerability[] = [
  {
    name: "Vulnerability 1",
    proofOfConcept:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    id: "1",
    severity: "Critical",
    associatedVulnerabilities: [subVulnerabilityMock[0], subVulnerabilityMock[1]],
  },
  {
    name: "Vulnerability 2",
    proofOfConcept:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    id: "2",
    severity: "High",
    associatedVulnerabilities: [subVulnerabilityMock[2]],
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
  filteredVulnerabilities: filteredVulnerabilitiesMock,
};

const MyContest = ({ contest = mock }: ContestProps) => (
  <Page>
    <main className="flex w-full flex-1 flex-col items-center justify-start p-10">
      <DefaultBackground className="flex w-full flex-col gap-8">
        <ContestHeader contest={contest} mode="sponsor" />
        <div className="flex w-full flex-col items-center justify-between gap-4">
          {contest.filteredVulnerabilities.map((vulnerability) => (
            <FilteredVulnerabilityInfo vulnerability={vulnerability} key={vulnerability.id} />
          ))}
        </div>
      </DefaultBackground>
    </main>
  </Page>
);

export default MyContest;
