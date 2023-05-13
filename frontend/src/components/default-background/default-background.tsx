import { cn } from "@/utils/utils";

const DefaultBackground = ({ children, className }: DefaultProps) => (
  <div className={cn("rounded-2xl border-2 border-highlightGrey bg-backgroundGrey p-6", className)}>{children}</div>
);

export { DefaultBackground };
