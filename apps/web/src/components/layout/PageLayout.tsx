import type { ReactNode } from "react";
import { cn } from "@repo/ui/styles/cn";

export interface PageLayoutProps {
  className?: string;
  children: ReactNode;
}

export const PageLayout = ({ className, children }: PageLayoutProps) => {
  return (
    <div className={cn("flex flex-col items-center p-6", className)}>
      {children}
    </div>
  );
};
