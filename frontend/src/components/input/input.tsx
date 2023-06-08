import { cn } from "@/utils/utils";
import { forwardRef, useRef } from "react";
import { UseFormRegister } from "react-hook-form";

interface InputProps extends PropsWithClassName {
  type?: "text" | "date" | "time";
  label?: string;
  color: "green" | "purple";
  placeholder?: string;
  register?: UseFormRegister<any>;
  name: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = "text", label, color, placeholder = "", name, className, register }, ref) => {
    if (register) {
      register(name, { required: true });
    }

    return (
      <div className={cn(className)}>
        <label
          htmlFor={label?.split(" ").join("")}
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
            id={label?.split(" ").join("")}
            className={cn(
              "block w-full rounded-md border-0 px-3 py-1.5 outline-none ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
              color === "green" &&
                "bg-mainGreen/10 text-mainGreen ring-mainGreen placeholder:text-mainGreen/50 focus:ring-mainGreen",
              color === "purple" &&
                "bg-mainPurple/10 text-mainPurple ring-mainPurple placeholder:text-mainPurple/50 focus:ring-mainPurple",
              type === "date" && "w-fit"
            )}
            placeholder={placeholder}
            {...register!(name, { valueAsDate: type === "date" })}
          />
        </div>
      </div>
    );
  }
);

Input.displayName = "input";

export { Input };
