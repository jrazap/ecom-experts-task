import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";

import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col bg-card", className)}
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-border/60 last:border-b-0", className)}
      {...props}
    />
  );
}

function StepChevron({ className }: { className?: string }) {
  return (
    <span
      data-slot="accordion-trigger-icon"
      aria-hidden
      className={cn(
        "size-0 shrink-0 border-x-[5px] border-t-[6px] border-x-transparent border-t-wyze-purple transition-transform duration-200 group-aria-expanded/accordion-trigger:rotate-180",
        className
      )}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  variant = "default",
  hideChevron = false,
  ...props
}: AccordionPrimitive.Trigger.Props & {
  variant?: "default" | "step";
  hideChevron?: boolean;
}) {
  const isStep = variant === "step";

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex flex-1 text-left transition-all outline-none focus-visible:ring-2 focus-visible:ring-wyze-purple/25 aria-disabled:pointer-events-none aria-disabled:opacity-50",
          isStep
            ? "flex-col items-stretch gap-0 hover:no-underline"
            : "items-center justify-between rounded-md border border-transparent py-4 text-sm font-medium hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground",
          className
        )}
        {...props}
      >
        {children}
        {!hideChevron &&
          (isStep ? (
            <StepChevron className="ml-auto" />
          ) : (
            <>
              <ChevronDownIcon
                data-slot="accordion-trigger-icon"
                className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden"
              />
              <ChevronUpIcon
                data-slot="accordion-trigger-icon"
                className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline"
              />
            </>
          ))}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          "h-(--accordion-panel-height) pt-0 data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
}

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  StepChevron,
};
