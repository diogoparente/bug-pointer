import { DefaultBackground } from "../default-background";
import { Paragraph, SubHeader } from "../text";
import { DateDisplay } from "../date-display";
import { cn } from "@/utils/utils";
import CustomLink from "../custom-link";

type ContestCardProps = {
  contest: Contest;
  mode: "hacker" | "sponsor";
};

const ContestCard = ({ contest, mode }: ContestCardProps) => (
  <DefaultBackground className="mb-6 flex w-full flex-col items-start justify-between gap-8">
    <div className="flex w-full flex-row items-center justify-between">
      <SubHeader
        className={cn("text-left", mode === "hacker" && "text-mainGreen", mode === "sponsor" && "text-mainPurple")}
      >
        {contest.name}
      </SubHeader>
      <SubHeader className="text-right">{contest.prize}</SubHeader>
    </div>
    <Paragraph>{contest.overview.length > 200 ? contest.overview.slice(0, 200) + "..." : contest.overview}</Paragraph>
    <div className="flex w-full flex-row items-center justify-between">
      <div className="flex flex-row items-center justify-start gap-8">
        <DateDisplay date={contest.startAt} label="Start Date" />
        <DateDisplay date={contest.closeAt} label="End Date" />
      </div>
      {mode === "hacker" ? (
        <CustomLink href={`/contests/${contest.contestAddress}`} type="button" size="small" color="green">
          More Details
        </CustomLink>
      ) : (
        <CustomLink href={`/my-contests/${contest.contestAddress}`} type="button" size="small" color="purple">
          See Results
        </CustomLink>
      )}
    </div>
  </DefaultBackground>
);

export { ContestCard };
