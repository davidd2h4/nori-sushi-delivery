import { forwardRef, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export const inputClasses =
  "w-full rounded-md border border-line bg-ink-2 px-4 text-base text-paper placeholder:text-mute/70 transition-colors hover:border-line-strong focus:border-red-bright focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-red/30 aria-[invalid=true]:border-red-bright";

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: string;
  className?: string;
  children: ReactNode;
}

/** Label + control + hint/error wiring. The control must use the same id. */
export function Field({ id, label, error, hint, optional, className, children }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-sm font-semibold text-paper/90">
        {label}
        {optional && <span className="ml-1.5 font-normal text-mute">({optional})</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm font-medium text-red-bright">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-sm text-mute">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function describedBy(id: string, error?: string, hint?: string) {
  if (error) return `${id}-error`;
  if (hint) return `${id}-hint`;
  return undefined;
}

export const Input = forwardRef<HTMLInputElement, ComponentProps<"input">>(function Input(
  { className, ...props },
  ref,
) {
  return <input ref={ref} className={cn(inputClasses, "h-13", className)} {...props} />;
});

export const Textarea = forwardRef<HTMLTextAreaElement, ComponentProps<"textarea">>(function Textarea(
  { className, ...props },
  ref,
) {
  return <textarea ref={ref} className={cn(inputClasses, "min-h-28 resize-y py-3", className)} {...props} />;
});
