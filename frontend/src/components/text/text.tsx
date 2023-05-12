import { cn } from "@/utils/utils";

const Header = ({ children, className }: DefaultProps) => (
  <h1 className={cn("text-6xl font-semibold", className)}>{children}</h1>
);

const SubHeader = ({ children, className }: DefaultProps) => (
  <h2 className={cn("text-4xl font-semibold", className)}>{children}</h2>
);

const Paragraph = ({ children, className }: DefaultProps) => <p className={cn("text-xl", className)}>{children}</p>;

export { Header, SubHeader, Paragraph };
