import { Minus, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
  size?: "sm" | "default";
  variant?: "pill" | "square";
  className?: string;
}

export function QuantitySelector({
  value,
  onIncrease,
  onDecrease,
  size = "default",
  variant = "pill",
  className,
}: QuantitySelectorProps) {
  if (variant === "square") {
    const buttonSize = size === "sm" ? "size-5" : "size-9";

    const buttonClasses = cn(
      "inline-flex cursor-pointer items-center justify-center rounded-[4px] border border-[#e3e6eb] bg-white text-[#4a4a4a] transition-colors hover:bg-[#f7f8fa]",
      buttonSize
    );

    return (
      <div
        className={cn("inline-flex items-center gap-2", className)}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onDecrease}
          aria-label="Decrease quantity"
          className={buttonClasses}
        >
          <Minus className="size-2.5 stroke-[2.5]" />
        </button>
        <span
          className={cn(
            "min-w-5 text-center font-semibold text-[#1a1a1a] tabular-nums",
            size === "sm" ? "text-sm" : "text-base"
          )}
        >
          {value}
        </span>
        <button
          type="button"
          onClick={onIncrease}
          aria-label="Increase quantity"
          className={buttonClasses}
        >
          <Plus className="size-2.5 stroke-[2.5]" />
        </button>
      </div>
    );
  }

  const iconSize = size === "sm" ? "size-7" : "size-8";

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-background",
        size === "sm" ? "h-7" : "h-9",
        className
      )}
      onClick={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        className={cn(
          "inline-flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground",
          iconSize
        )}
        onClick={onDecrease}
        aria-label="Decrease quantity"
      >
        <Minus className="size-4" />
      </button>
      <span
        className={cn(
          "min-w-6 text-center font-medium tabular-nums",
          size === "sm" ? "text-xs" : "text-sm"
        )}
      >
        {value}
      </span>
      <button
        type="button"
        className={cn(
          "inline-flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground",
          iconSize
        )}
        onClick={onIncrease}
        aria-label="Increase quantity"
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}
