import { forwardRef, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ChoiceCardProps extends Omit<ComponentProps<"input">, "type"> {
  label: string;
  description?: string;
  icon?: ReactNode;
}

/** A native radio styled as a selectable card. */
export const ChoiceCard = forwardRef<HTMLInputElement, ChoiceCardProps>(function ChoiceCard(
  { label, description, icon, disabled, className, id, ...props },
  ref,
) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "relative flex min-h-16 items-center gap-3 rounded-md border border-line bg-ink-2 p-4 transition-colors",
        "has-[:checked]:border-red has-[:checked]:bg-red/[0.08] has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-red-bright",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:border-line-strong",
        className,
      )}
    >
      <input ref={ref} id={id} type="radio" disabled={disabled} className="peer sr-only" {...props} />
      <span
        aria-hidden="true"
        className="grid size-5 shrink-0 place-items-center rounded-full border-2 border-line-strong transition-colors peer-checked:border-red-bright peer-checked:[&>span]:scale-100"
      >
        <span className="size-2.5 scale-0 rounded-full bg-red-bright transition-transform" />
      </span>
      {icon && <span className="text-mute peer-checked:text-paper">{icon}</span>}
      <span className="flex flex-col">
        <span className="font-semibold text-paper">{label}</span>
        {description && <span className="text-sm text-mute">{description}</span>}
      </span>
    </label>
  );
});
