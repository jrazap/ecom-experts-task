import { SummaryItem } from "@/components/builder/summary-item";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { formatCurrency, formatMonthly } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { LineItem } from "@/store/selectors";
import { useBuilderTotals, useLineItems } from "@/store/selectors";
import { Truck } from "lucide-react";

const sectionLabels: Record<
  "cameras" | "sensors" | "accessories" | "plan",
  string
> = {
  cameras: "Cameras",
  sensors: "Sensors",
  accessories: "Accessories",
  plan: "Plan",
};

const sectionOrder = ["cameras", "sensors", "accessories", "plan"] as const;

function groupLineItems(items: LineItem[]) {
  const groups: Record<(typeof sectionOrder)[number], LineItem[]> = {
    cameras: [],
    sensors: [],
    accessories: [],
    plan: [],
  };

  for (const item of items) {
    if (item.category === "plan") {
      groups.plan.push(item);
      continue;
    }

    if (item.category === "protection") {
      groups.accessories.push(item);
      continue;
    }

    groups[item.category as "cameras" | "sensors" | "accessories"].push(item);
  }

  return groups;
}

export function ReviewPanel({ className }: { className?: string }) {
  const lineItems = useLineItems();
  const { total, originalTotal, savings, monthlyEstimate, shippingOriginal } =
    useBuilderTotals();
  const groups = groupLineItems(lineItems);

  return (
    <aside
      className={cn(
        "flex flex-col overflow-hidden bg-wyze-step-open sm:rounded-[10px] lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)]",
        className
      )}
    >
      <div className="border-b border-[#dce3ee] px-5 pb-4">
        <p className="pt-4 pb-1 text-xs font-normal tracking-[1.6px] text-dark-heazer-grey uppercase">
          Review
        </p>
        <h2 className="mt-3 text-[22px] font-bold tracking-[0.6px] text-retro-black">
          Your security system
        </h2>
        <p className="mt-1 text-sm leading-snug text-retro-black/75">
          Review your personalized protection system designed to keep what
          matters most safe.
        </p>
      </div>

      <ScrollArea className="flex-1 px-5">
        <div>
          {sectionOrder.map((key) => {
            const items = groups[key];
            if (!items.length) return null;

            return (
              <div key={key}>
                <p className="pt-[15px] pb-2 text-xs font-normal tracking-[1.6px] text-pewter uppercase">
                  {sectionLabels[key]}
                </p>
                <div className="flex flex-col gap-3">
                  {items.map((item) => (
                    <SummaryItem key={item.id} item={item} />
                  ))}
                </div>
                <Separator className="mt-4 bg-[#CED6DE]" />
              </div>
            );
          })}
        </div>
      </ScrollArea>

      <div className="border-t border-[#CED6DE] px-5 pt-5 pb-[30px]">
        <div className="flex items-center gap-2.5 py-3">
          <div className="flex size-[52px] shrink-0 items-center justify-center rounded-[10px] bg-white shadow-[0_1px_3px_rgba(15,23,42,0.08)]">
            <Truck className="size-6 text-emerald-600" strokeWidth={1.75} />
          </div>
          <p className="min-w-0 flex-1 text-sm text-retro-black">
            Fast Shipping
          </p>
          <div className="min-w-[50px] shrink-0 text-right">
            <p className="text-xs leading-tight text-pale-sky line-through">
              {formatCurrency(shippingOriginal)}
            </p>
            <p className="text-sm leading-tight font-bold text-mckenzie">
              FREE
            </p>
          </div>
        </div>
        <div className="mb-3 flex items-end justify-between gap-3">
          <img
            src="/satisfaction-badge.webp"
            alt="Guarantee"
            className="size-[78px]"
          />

          <div className="text-end">
            <span className="mb-2 inline-block rounded-[3px] bg-mckenzie px-2 py-[5px] text-xs tracking-[-5%] text-white">
              as low as {formatMonthly(monthlyEstimate)}
            </span>
            <div className="flex items-baseline gap-2">
              {originalTotal > total && (
                <p className="text-[18px] leading-tight font-normal text-pewter line-through">
                  {formatCurrency(originalTotal)}
                </p>
              )}
              <p className="text-[24px] leading-none font-bold text-mckenzie">
                {formatCurrency(total)}
              </p>
            </div>
          </div>
        </div>

        {savings > 0 && (
          <p className="mb-4 text-center text-xs font-medium text-[#0AA288]">
            Congrats! You&apos;re saving {formatCurrency(savings)} on your
            security bundle!
          </p>
        )}

        <Button className="h-12 w-full rounded-[4px] bg-mckenzie text-base font-bold text-white hover:bg-mckenzie/90">
          Checkout
        </Button>
        <button
          type="button"
          className="mt-3 w-full text-center text-sm tracking-[-0.02px] text-dark-heazer-grey italic underline underline-offset-2"
        >
          Save my system for later
        </button>
      </div>
    </aside>
  );
}
