import { cn } from "@/lib/utils";
import { useBuilderStore } from "@/store/builder.store";
import type { Product } from "@/types/builder";

import { formatCurrency } from "@/lib/format";
import { QuantitySelector } from "../quantity-selector";
import {
  ColorOptionButton,
  getProductImage,
  ProductImage,
} from "./product-image";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const quantity = useBuilderStore(
    (state) => state.quantities[product.id] ?? 0
  );
  const selectedOption = useBuilderStore((state) => state.options[product.id]);
  const increase = useBuilderStore((state) => state.increase);
  const decrease = useBuilderStore((state) => state.decrease);
  const setOption = useBuilderStore((state) => state.setOption);

  const activeOption = selectedOption ?? product.options?.[0]?.value;
  const imageSrc = getProductImage(product, activeOption);
  const isSelected = quantity > 0;

  return (
    <article
      className={cn(
        "relative rounded-[10px] bg-white p-2.5 transition-all min-h-[180px]",
        isSelected
          ? "border border-wyze-purple shadow-[0_0_0_1px_rgba(80,57,209,0.08)]"
          : "border border-transparent",
        className
      )}
    >
      <div className="space-y-4 h-full">
        <div className="flex gap-4 h-full">
          <div className="flex w-[112px] shrink-0 flex-col items-center justify-center gap-5">
            <div className="flex items-center justify-center w-full">
              {/* Badge */}
              {product.badge && (
                <span className="absolute top-2.5 inset-s-2.5 z-10 rounded-full bg-wyze-purple px-2.5 py-1 text-[11px] leading-none font-bold text-white">
                  {product.badge}
                </span>
              )}

              {/* Product Image */}
              <ProductImage
                src={imageSrc}
                alt={`${product.name}${activeOption ? ` - ${activeOption}` : ""}`}
                withShadow
                className="h-[104px] w-full"
              />
            </div>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-2.5 h-full">
            {/* Product Name and Description */}
            <div className="space-y-2">
              <h3 className="text-base leading-tight font-bold text-retro-black line-clamp-1">
                {product.name}
              </h3>

              <div className="line-clamp-2">
                <span className="text-sm leading-snug text-retro-black/75">
                  {product.description}
                </span>{" "}
                <button
                  type="button"
                  className="text-sm font-medium text-candy-blue underline underline-offset-2"
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Color Options */}
            {product.options && product.options.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.options.map((option) => (
                  <ColorOptionButton
                    key={option.value}
                    product={product}
                    option={option}
                    selected={activeOption === option.value}
                    onSelect={() => setOption(product.id, option.value)}
                  />
                ))}
              </div>
            )}

            {/* Quantity Selector and Price */}
            <div className="flex-1 flex items-end">
              <div className="flex flex-wrap items-center justify-between gap-4 w-full">
              {/* Quantity Selector */}
              <QuantitySelector
                variant="square"
                size="sm"
                value={quantity}
                onIncrease={() => increase(product.id)}
                onDecrease={() => decrease(product.id)}
              />

              {/* Price */}
              <div className="flex flex-col items-end gap-1">
                {product.discount && (
                  <span className="text-base font-normal leading-none text-red-beauty line-through">
                    {formatCurrency(product.price )}
                  </span>
                )}
                <span className="text-base leading-none font-normal text-retro-black/75">
                  {product.free ? "FREE" : product.discount ? formatCurrency(product.price* (1 - product.discount / 100)) : formatCurrency(product.price)}
                </span>
              </div>
            </div>
            </div>
            
          </div>
        </div>
      </div>
    </article>
  );
}
