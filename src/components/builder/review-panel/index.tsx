import { Truck } from "lucide-react";

import { SummaryItem } from "@/components/builder/summary-item";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { formatCurrency, formatMonthly } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useBuilderTotals, useLineItems } from "@/store/selectors";
import type { LineItem } from "@/store/selectors";
import type { ProductCategory } from "@/types/builder";

const sectionLabels: Record<ProductCategory | "plan", string> = {
  cameras: "Cameras",
  sensors: "Sensors",
  accessories: "Accessories",
  protection: "Protection",
  plan: "Plan",
};

function groupLineItems(items: LineItem[]) {
  const groups: Partial<Record<ProductCategory | "plan", LineItem[]>> = {};

  for (const item of items) {
    const key = item.category;
    groups[key] = [...(groups[key] ?? []), item];
  }

  return groups;
}

export function ReviewPanel({ className }: { className?: string }) {
  const lineItems = useLineItems();
  const { total, originalTotal, savings, monthlyEstimate } = useBuilderTotals();
  const groups = groupLineItems(lineItems);

  return (
    <aside
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl bg-wyze-step-open lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)]",
        className
      )}
    >
      <div className="border-b border-wyze-purple/10 px-5">
        <p className="pt-[15px] pb-[5px] text-xs font-normal tracking-[1.6px] text-dark-heazer-grey uppercase">
          Review
        </p>
        <h2 className="mt-5 mb-[5px] text-[22px] font-bold tracking-[0.6px] text-retro-black">
          Your security system
        </h2>
        <p className="mb-2.5 text-sm text-retro-black/75">
          Review your personalized protection system designed to keep what
          matters most safe.
        </p>
      </div>

      <ScrollArea className="flex-1 px-5">
        <div>
          {(
            Object.keys(sectionLabels) as Array<keyof typeof sectionLabels>
          ).map((key) => {
            const items = groups[key];
            if (!items?.length) return null;

            return (
              <div key={key}>
                <p className="pt-[15px] pb-2 text-xs font-normal tracking-[1.6px] text-pewter uppercase">
                  {sectionLabels[key]}
                </p>
                {items.map((item) => (
                  <SummaryItem key={item.id} item={item} />
                ))}
                <Separator className="bg-wyze-purple/10" />
              </div>
            );
          })}

          <div className="flex items-center gap-3 py-3">
            <div className="flex size-12 items-center justify-center rounded-md bg-muted/40 text-wyze-purple">
              <Truck className="size-5" />
            </div>
            <p className="flex-1 text-sm font-medium">Fast Shipping</p>
            <p className="text-sm font-bold text-wyze-blue">FREE</p>
          </div>
        </div>
      </ScrollArea>

      <div className="border-t border-wyze-purple/10 bg-card/60 px-6 py-5">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex size-14 items-center justify-center rounded-full border-2 border-wyze-purple/30 bg-wyze-purple/5 text-center text-[9px] leading-tight font-bold text-wyze-purple">
            100%
            <br />
            Wyze
            <br />
            guarantee
          </div>
          <div className="text-right">
            <Badge className="mb-2 rounded-md bg-wyze-purple px-2 py-0.5 text-[11px] text-white hover:bg-wyze-purple">
              as low as {formatMonthly(monthlyEstimate)}
            </Badge>
            {originalTotal > total && (
              <p className="text-sm text-muted-foreground line-through">
                {formatCurrency(originalTotal)}
              </p>
            )}
            <p className="text-3xl font-bold text-wyze-blue">
              {formatCurrency(total)}
            </p>
          </div>
        </div>

        {savings > 0 && (
          <p className="mb-4 text-center text-sm font-medium text-emerald-600">
            Congrats! You&apos;re saving {formatCurrency(savings)} on your
            security bundle!
          </p>
        )}

        <Button className="h-11 w-full rounded-lg bg-wyze-purple text-base font-semibold text-white hover:bg-wyze-purple/90">
          Checkout
        </Button>
        <button
          type="button"
          className="mt-3 w-full text-center text-sm font-medium text-wyze-blue underline-offset-4 hover:underline"
        >
          Save my system for later
        </button>
      </div>
    </aside>
  );
}
