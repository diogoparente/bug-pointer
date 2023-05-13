import { cn } from "@/utils/utils";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: "green" | "purple" | "gradient";
}

const Button = ({ children, color, className, ...rest }: ButtonProps) => {
  if (color === "gradient") {
    return (
      <button
        {...rest}
        className="rounded-xl bg-gradient-to-r from-mainPurple to-mainGreen p-[2px] hover:opacity-90 hover:brightness-200"
      >
        <div className="flex items-center justify-center rounded-[0.67rem] bg-[#11141d]/95 px-4 py-2">
          <p className="bg-gradient-to-r from-mainPurple to-mainGreen bg-clip-text font-medium text-transparent">
            {children}
          </p>
        </div>
      </button>
    );
  }

  return (
    <button
      {...rest}
      className={cn(
        "rounded-xl border-2 px-4 py-2 font-medium hover:opacity-90 hover:brightness-200",
        color === "green" && "border-mainGreen bg-mainGreen/5 text-mainGreen",
        color === "purple" && "border-mainPurple bg-mainPurple/5 text-mainPurple",
        className
      )}
    >
      {children}
    </button>
  );
};

export { Button };
