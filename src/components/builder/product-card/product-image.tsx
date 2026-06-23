import { Camera } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import type { Product, ProductOption } from "@/types/builder";

const colorMap: Record<string, string> = {
  white: "bg-white border-[#e3e6eb]",
  grey: "bg-zinc-400 border-transparent",
  black: "bg-zinc-900 border-transparent",
};

export function getProductImage(
  product: Product,
  selectedOption?: string
): string {
  const option = product.options?.find((item) => item.value === selectedOption);
  if (option?.image) {
    return option.image;
  }

  return product.image;
}

export function getOptionImage(
  product: Product,
  option: ProductOption
): string {
  return option.image ?? product.image;
}

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  withShadow?: boolean;
}

export function ProductImage({
  src,
  alt,
  className,
  withShadow = false,
}: ProductImageProps) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (failed) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-[4px] bg-[#f3f5f8] w-full",
          className
        )}
      >
        <Camera className="size-8 text-muted-foreground/60" />
      </div>
    );
  }

  return (
    <img
      key={src}
      src={src}
      alt={alt}
      className={cn(
        "object-contain transition-opacity duration-200",
        withShadow && "drop-shadow-[0_8px_16px_rgba(15,23,42,0.12)]",
        className
      )}
      onError={() => setFailed(true)}
    />
  );
}

export function ColorSwatch({ value }: { value: string }) {
  return (
    <span
      className={cn(
        "inline-block size-3 rounded-full border",
        colorMap[value] ?? "bg-muted"
      )}
    />
  );
}

interface ColorOptionButtonProps {
  product: Product;
  option: ProductOption;
  selected: boolean;
  onSelect: () => void;
}

export function ColorOptionButton({
  product,
  option,
  selected,
  onSelect,
}: ColorOptionButtonProps) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onSelect();
      }}
      className={cn(
        "inline-flex h-[26px] min-w-[65px] items-center gap-0.5 rounded-md border bg-white px-2 py-1.5 text-left transition-colors",
        selected
          ? "border-wyze-purple ring-1 ring-wyze-purple/15"
          : "border-[#e3e6eb] hover:border-[#cfd5df]"
      )}
    >
      <ProductImage
        src={getOptionImage(product, option)}
        alt={`${product.name} ${option.label}`}
        className="size-6 shrink-0 p-0.5"
      />
      <span className="text-[10px] font-medium text-wood-smoke">
        {option.label}
      </span>
    </button>
  );
}
