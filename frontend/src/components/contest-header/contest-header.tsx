import { Header, SubHeader } from "../text";
import { DateDisplay } from "../date-display";
import { cn } from "@/utils/utils";

type ContestHeaderProps = {
  contest: Contest;
  mode: "hacker" | "sponsor";
};

const ContestHeader = ({ contest, mode }: ContestHeaderProps) => (
  <>
    <div className="flex w-full flex-row items-center justify-between">
      <Header className={cn(mode === "hacker" && "text-mainGreen", mode === "sponsor" && "text-mainPurple")}>
        {contest.name}
      </Header>
      <div className="flex flex-row items-center justify-start gap-8">
        <DateDisplay date={contest.startAt} label="Start Date" />
        <DateDisplay date={contest.closeAt} label="End Date" />
      </div>
    </div>
    <SubHeader>{`Total Prize: ${contest.prize} USDC`}</SubHeader>
  </>
);

export { ContestHeader };
