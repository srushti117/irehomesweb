import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Prefixes a root-relative public asset path (e.g. "/foo.png") with Vite's
// configured base, so assets resolve correctly when deployed under a subpath
// (like GitHub Pages' /<repo>/).
export function asset(path: string) {
  return `${import.meta.env.BASE_URL.replace(/\/$/, "")}${path}`;
}
