import { DefaultBackground } from "../default-background";
import { Paragraph, SubHeader } from "../text";
import { DateDisplay } from "../date-display";
import Button from "../button";

type ContestCardProps = {
  contest: Contest;
};

const ContestCard = ({ contest }: ContestCardProps) => (
  <DefaultBackground className="mb-6 flex w-full flex-col items-start justify-between gap-8">
    <div className="flex w-full flex-row items-center justify-between">
      <SubHeader className="text-left text-mainGreen">{contest.name}</SubHeader>
      <SubHeader className="text-right">{contest.prize}</SubHeader>
    </div>
    <Paragraph>{contest.overview.length > 200 ? contest.overview.slice(0, 200) + "..." : contest.overview}</Paragraph>
    <div className="flex w-full flex-row items-center justify-between">
      <div className="flex flex-row items-center justify-start gap-8">
        <DateDisplay date={contest.startAt} label="Start Date" />
        <DateDisplay date={contest.closeAt} label="End Date" />
      </div>
      <Button color="green">More Details</Button>
    </div>
  </DefaultBackground>
);

export { ContestCard };
