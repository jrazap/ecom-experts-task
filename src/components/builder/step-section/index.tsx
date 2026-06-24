import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  StepChevron,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface StepSectionProps {
  value: string;
  step: number;
  totalSteps?: number;
  title: string;
  icon: LucideIcon;
  selectedCount?: number;
  children: ReactNode;
  className?: string;
}

export function StepSection({
  value,
  step,
  totalSteps = 4,
  title,
  icon: Icon,
  selectedCount,
  children,
  className,
}: StepSectionProps) {
  return (
    <AccordionItem
      value={value}
      className={cn(
        "group border-none px-4 py-2 transition-colors last:border-b-0",
        "data-open:border-b-none data-open:rounded-[10px] data-open:bg-wyze-step-open data-open:px-4 data-open:py-2",
        className
      )}
    >
      <AccordionTrigger variant="step" hideChevron className="w-full">
        <span className="block px-2 pt-4 pb-3 text-xs font-normal tracking-[1.6px] text-dark-heazer-grey uppercase">
          Step {step} of {totalSteps}
        </span>

        <span className="flex w-full items-center gap-3 border-y border-retro-black/75 px-2 py-4 group-data-open:border-b-0">
          <Icon className="size-[22px] shrink-0 stroke-[1.5] text-foreground" />
          <span className="flex-1 text-[22px] font-semibold text-wood-smoke">
            {title}
          </span>
          {selectedCount !== undefined && selectedCount > 0 && (
            <span className="hidden text-sm font-medium text-mckenzie group-aria-expanded/accordion-trigger:inline">
              {selectedCount} selected
            </span>
          )}
          <StepChevron className="ml-1" />
        </span>
      </AccordionTrigger>

      <AccordionContent className="px-2 pt-1 pb-5">{children}</AccordionContent>
    </AccordionItem>
  );
}
