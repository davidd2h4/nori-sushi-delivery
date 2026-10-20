import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  text?: ReactNode;
  action?: ReactNode;
  as?: "h1" | "h2";
  className?: string;
  id?: string;
}

export function SectionHeading({ eyebrow, title, text, action, as: Tag = "h2", className, id }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-6 md:flex-row md:items-end md:justify-between", className)}>
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
        <Tag
          id={id}
          className={cn(
            "font-display font-semibold text-balance text-paper",
            Tag === "h1" ? "text-h1" : "text-h2",
          )}
        >
          {title}
        </Tag>
        {text && <p className="mt-5 max-w-xl text-base text-mute md:text-lg">{text}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
