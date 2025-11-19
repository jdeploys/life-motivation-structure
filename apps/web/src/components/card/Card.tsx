import { cn } from "@repo/ui/styles/cn";
import type { ReactNode } from "react";

export interface CardProps {
  children: ReactNode;
}

export const Card = ({ children }: CardProps) => (
  <div
    className={cn(
      "bg-backgrounds-tertiary p-4 rounded-md whitespace-pre",
    )}
  >
    {children}
  </div>
);
