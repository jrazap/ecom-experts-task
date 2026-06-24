import { ProductImage } from "@/components/builder/product-card/product-image";
import { QuantitySelector } from "@/components/builder/quantity-selector";
import { formatCurrency, formatMonthly } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useBuilderStore } from "@/store/builder.store";
import type { LineItem } from "@/store/selectors";

interface SummaryItemProps {
  item: LineItem;
  className?: string;
}

function PriceColumn({
  current,
  original,
  free,
  className,
}: {
  current: string;
  original?: string;
  free?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("min-w-[50px] shrink-0 text-right", className)}>
      {original && (
        <p className="text-xs leading-tight text-pale-sky line-through">
          {original}
        </p>
      )}
      <p className="text-sm leading-tight font-bold text-mckenzie">
        {free ? "FREE" : current}
      </p>
    </div>
  );
}

export function SummaryItem({ item, className }: SummaryItemProps) {
  const increase = useBuilderStore((state) => state.increase);
  const decrease = useBuilderStore((state) => state.decrease);
  const isPlan = item.category === "plan";
  const lineTotal = item.price * item.quantity;
  const lineListTotal = item.listPrice
    ? item.listPrice * item.quantity
    : undefined;

  if (isPlan) {
    const [firstWord, ...rest] = item.name.split(" ");

    return (
      <div className={cn("flex items-center gap-3", className)}>
        <div className="flex size-[52px] shrink-0 items-center justify-center rounded-[10px] bg-white shadow-[0_1px_3px_rgba(15,23,42,0.08)]">
          <div className="flex size-9 items-center justify-center rounded-full bg-candy-blue/10 text-candy-blue">
            <span className="text-[9px] font-bold tracking-tight">WYZE</span>
          </div>
        </div>

        <p className="min-w-0 flex-1 text-sm leading-tight text-retro-black">
          <span className="font-bold">{firstWord}</span>
          {rest.length > 0 && (
            <span className="font-bold text-mckenzie"> {rest.join(" ")}</span>
          )}
        </p>

        <PriceColumn
          current={formatMonthly(item.price)}
          original={
            item.discount && lineListTotal && lineListTotal > lineTotal
              ? formatMonthly(item.listPrice!)
              : undefined
          }
        />
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="flex size-[52px] shrink-0 items-center justify-center rounded-[10px] bg-white p-1.5 shadow-[0_1px_3px_rgba(15,23,42,0.08)]">
        <ProductImage
          src={item.image}
          alt={item.name}
          className="size-full object-contain"
        />
      </div>

      <p className="min-w-0 flex-1 text-sm leading-snug text-retro-black">
        {item.name}
      </p>

      {!item.free && (
        <QuantitySelector
          variant="square"
          size="sm"
          value={item.quantity}
          onIncrease={() => increase(item.id)}
          onDecrease={() => decrease(item.id)}
        />
      )}

      {item.free && <div className="w-[88px] shrink-0" />}

      <PriceColumn
        current={formatCurrency(lineTotal)}
        original={
          item.discount && lineListTotal && lineListTotal > lineTotal
            ? formatCurrency(lineListTotal)
            : undefined
        }
        free={item.free}
      />
    </div>
  );
}
