import { cn } from "@/utils/utils";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type?: "text" | "date";
  placeholder?: string;
  color: "green" | "purple";
}

const Input = ({ type = "text", label, color, placeholder = "", className }: PropsWithClassName<InputProps>) => (
  <div className={cn(className)}>
    <label
      htmlFor={label.split(" ").join("")}
      className={cn(
        "block text-sm font-medium leading-6",
        color === "green" && "text-mainGreen",
        color === "purple" && "text-mainPurple"
      )}
    >
      {label}
    </label>
    <div className="relative mt-0 rounded-md shadow-sm">
      <input
        type={type}
        name={label.split(" ").join("")}
        id={label.split(" ").join("")}
        className={cn(
          "block w-full rounded-md border-0 px-3 py-1.5 outline-none ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
          color === "green" &&
            "bg-mainGreen/10 text-mainGreen ring-mainGreen placeholder:text-mainGreen/50 focus:ring-mainGreen",
          color === "purple" &&
            "bg-mainPurple/10 text-mainPurple ring-mainPurple placeholder:text-mainPurple/50 focus:ring-mainPurple",
          type === "date" && "w-fit"
        )}
        placeholder={placeholder}
      />
    </div>
  </div>
);

export { Input };
