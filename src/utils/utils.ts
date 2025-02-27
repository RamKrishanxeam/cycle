import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...Values: ClassValue[]) {
  return twMerge(clsx(Values));
}
