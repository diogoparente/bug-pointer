import { cn } from "@/utils/utils";
import { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  color: "green" | "purple";
}

const TextArea = ({ label, color, className }: PropsWithClassName<TextAreaProps>) => (
  <div className={cn("flex flex-col items-start justify-start", className)}>
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
    <textarea
      name={label.split(" ").join("")}
      id={label.split(" ").join("")}
      className={cn(
        "block w-full flex-1 rounded-md border-0 px-3 py-1.5 outline-none ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
        color === "green" &&
          "bg-mainGreen/10 text-mainGreen ring-mainGreen placeholder:text-mainGreen/50 focus:ring-mainGreen",
        color === "purple" &&
          "bg-mainPurple/10 text-mainPurple ring-mainPurple placeholder:text-mainPurple/50 focus:ring-mainPurple"
      )}
    />
  </div>
);

export { TextArea };
