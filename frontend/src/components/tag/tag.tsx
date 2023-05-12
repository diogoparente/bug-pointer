import { cn } from "@/utils/utils";

interface TagProps {
  color: "red" | "orange" | "yellow" | "green" | "grey" | "purple";
  className?: string;
  children: React.ReactNode;
}

const Tag = ({ children, className, color }: TagProps) => (
  <div
    className={cn(
      color === "red" && "border-red-600 bg-red-600/5 text-red-600",
      color === "orange" && "border-orange-600 bg-orange-600/5 text-orange-600",
      color === "yellow" && "border-yellow-600 bg-yellow-600/5 text-yellow-600",
      color === "green" && "border-mainGreen bg-mainGreen/5 text-mainGreen",
      color === "grey" && "border-gray-500 bg-gray-500/5 text-gray-500",
      color === "purple" && "border-mainPurple bg-mainPurple/5 text-mainPurple",
      "w-fit rounded-lg border-2 px-3 py-1 font-semibold",
      className
    )}
  >
    {children}
  </div>
);

export { Tag };
