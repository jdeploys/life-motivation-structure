import { cn, CnProps } from "@/styles/cn";
import type { ReactNode } from "react";

export interface ButtonProps {
  className?: CnProps;
  children: ReactNode;
}

export const Button = ({ className, children }: ButtonProps) => {
  return (
    <button
      className={cn(
        "activxe:bg-blue-500 bg-blue-400 py-2 px-3 rounded",
        className,
      )}
    >
      {children}
    </button>
  );
};
