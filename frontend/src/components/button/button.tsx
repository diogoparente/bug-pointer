import { cn } from "@/utils/utils";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: "mainGreen" | "mainPurple";
}

const Button = ({ children, color, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className={cn(color === "mainGreen" && "bg-mainGreen", color === "mainPurple" && "bg-mainPurple")}
    >
      {children}
    </button>
  );
};

export { Button };
