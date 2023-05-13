import { cn } from "@/utils/utils";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: "green" | "purple" | "gradient";
  size: "small" | "large";
}

const Button = ({ children, color, size, className, ...rest }: ButtonProps) => {
  if (color === "gradient") {
    return (
      <button
        {...rest}
        className={cn(
          "rounded-xl bg-gradient-to-r from-mainPurple to-mainGreen p-[2px] hover:opacity-90 hover:brightness-200"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-center rounded-[0.67rem] bg-[#11141d]/95",
            size === "small" && "px-4 py-2",
            size === "large" && "px-8 py-4"
          )}
        >
          <p
            className={cn(
              "bg-gradient-to-r from-mainPurple to-mainGreen bg-clip-text font-medium text-transparent",
              size === "large" && "text-lg"
            )}
          >
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
        "rounded-xl border-2 font-medium hover:opacity-90 hover:brightness-200",
        size === "small" && "px-4 py-2",
        size === "large" && "px-8 py-4 text-lg",
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
