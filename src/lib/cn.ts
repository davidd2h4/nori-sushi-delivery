import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge the custom design tokens from globals.css so that, for
// example, `text-h2` is treated as a font size and not as a text colour.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["display", "h1", "h2", "h3"],
      shadow: ["card", "lift", "glow", "drawer"],
      animate: ["fade-up", "fade-in", "drawer-in", "menu-in", "toast-in", "float", "spin-slow"],
    },
  },
});

/** Joins class names and lets later Tailwind utilities override earlier ones. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
