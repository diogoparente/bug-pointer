import { DefaultBackground } from "@/components/default-background";
import { Header, SubHeader } from "@/components/text";
import { Page } from "@/components/page";
import { DateDisplay } from "@/components/date-display";
import Button from "@/components/button";
import { FilledText } from "@/components/filled-text";
import CustomLink from "@/components/custom-link";

type ContestProps = {
  contest: Contest;
};

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
  submittedVulnerabilities: [],
  filteredVulnerabilities: [],
};

const Contest = ({ contest = mock }: ContestProps) => (
  <Page>
    <main className="flex w-full flex-1 flex-col items-center justify-start p-10">
      <DefaultBackground className="flex w-full flex-col gap-8">
        <div className="flex w-full flex-row items-center justify-between">
          <Header className="text-mainGreen">{contest.name}</Header>
          <div className="flex flex-row items-center justify-start gap-8">
            <DateDisplay date={contest.startAt} label="Start Date" />
            <DateDisplay date={contest.closeAt} label="End Date" />
          </div>
        </div>
        <SubHeader>{`Total Prize: ${mock.prize}`}</SubHeader>
        <div className="flex flex-row justify-start gap-8">
          <CustomLink color="green" href="/" type="button">
            Submit Finding
          </CustomLink>
          <Button color="green">Apply as Judge</Button>
        </div>
        <FilledText label="Overview" text={contest.overview} />
        <FilledText label="Scope" text={contest.scope} />
        <FilledText label="Out of Scope" text={contest.outOfScope} />
        <FilledText label="Links" text={contest.links} />
      </DefaultBackground>
    </main>
  </Page>
);

export default Contest;
