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

export function SummaryItem({ item, className }: SummaryItemProps) {
  const increase = useBuilderStore((state) => state.increase);
  const decrease = useBuilderStore((state) => state.decrease);
  const isPlan = item.category === "plan";
  const lineTotal = item.price * item.quantity;
  const lineOldTotal = item.oldPrice
    ? item.oldPrice * item.quantity
    : undefined;

  return (
    <div className={cn("flex items-center gap-3 py-3", className)}>
      {!isPlan && (
        <ProductImage
          src={item.image}
          alt={item.name}
          className="size-12 shrink-0 rounded-md bg-muted/40 p-1"
        />
      )}

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">
          {item.name}
        </p>
        {!isPlan && !item.free && (
          <QuantitySelector
            size="sm"
            value={item.quantity}
            onIncrease={() => increase(item.id)}
            onDecrease={() => decrease(item.id)}
            className="mt-1"
          />
        )}
      </div>

      <div className="shrink-0 text-right">
        {item.free ? (
          <p className="text-sm font-bold text-wyze-blue">FREE</p>
        ) : isPlan ? (
          <p className="text-sm font-bold text-wyze-blue">
            {formatMonthly(item.price)}
          </p>
        ) : (
          <>
            {lineOldTotal !== undefined && lineOldTotal > lineTotal && (
              <p className="text-xs text-destructive line-through">
                {formatCurrency(lineOldTotal)}
              </p>
            )}
            <p className="text-sm font-bold text-wyze-blue">
              {formatCurrency(lineTotal)}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
