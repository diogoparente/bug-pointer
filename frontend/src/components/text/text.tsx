import { cn } from "@/utils/utils";
import React from "react";

const Header = ({ children, className }: DefaultProps) => (
  <h1 className={cn("text-4xl font-semibold text-white", className)}>{children}</h1>
);

const SubHeader = ({ children, className }: DefaultProps) => (
  <h2 className={cn("text-3xl font-semibold text-white", className)}>{children}</h2>
);

const SubText = ({ children, className }: DefaultProps) => (
  <h3 className={cn("text-2xl font-medium text-white", className)}>{children}</h3>
);

const Paragraph = ({ children, className }: DefaultProps) => (
  <p className={cn("text-lg text-white", className)}>{children}</p>
);

export { Header, SubHeader, SubText, Paragraph };
