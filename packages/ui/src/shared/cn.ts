import { ClassNameValue, twMerge } from "tailwind-merge";

export type CnProps = ClassNameValue[];

export const cn = (...strings: CnProps) => {
  return twMerge(strings);
};
