import { cn } from "@/utils/utils";

const FadingLine = ({ className }: PropsWithClassName) => (
  <div className={cn("h-[2px] w-full bg-gradient-to-r from-mainPurple to-mainGreen", className)} />
);

export { FadingLine };
