import { cn } from "@/utils/utils";
import { TextareaHTMLAttributes, useRef } from "react";
import { UseFormRegister } from "react-hook-form";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  color: "green" | "purple";
  register?: UseFormRegister<any>;
  name: string;
}

const TextArea = ({ label, color, className, register, name }: PropsWithClassName<TextAreaProps>) => {
  if (register) {
    register(name, { required: true });
  }
  return (
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
        id={label.split(" ").join("")}
        className={cn(
          "block w-full flex-1 rounded-md border-0 px-3 py-1.5 outline-none ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
          color === "green" &&
            "bg-mainGreen/10 text-mainGreen ring-mainGreen placeholder:text-mainGreen/50 focus:ring-mainGreen",
          color === "purple" &&
            "bg-mainPurple/10 text-mainPurple ring-mainPurple placeholder:text-mainPurple/50 focus:ring-mainPurple"
        )}
        {...register!(name)}
      />
    </div>
  );
};

export { TextArea };
