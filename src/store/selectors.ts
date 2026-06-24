import { getPlanById, getProductById } from "@/lib/catalog";
import { getSalePrice } from "@/lib/pricing";
import type { ProductCategory } from "@/types/builder";
import { useMemo } from "react";
import { useBuilderStore } from "./builder.store";

export interface LineItem {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
  listPrice?: number;
  discount?: number;
  free?: boolean;
  category: ProductCategory | "plan";
}

export function useQuantities() {
  return useBuilderStore((state) => state.quantities);
}

export function useSelectedPlanId() {
  return useBuilderStore((state) => state.selectedPlanId);
}

export function useLineItems(): LineItem[] {
  const quantities = useQuantities();
  const selectedPlanId = useSelectedPlanId();

  return useMemo(() => {
    const items: LineItem[] = [];

    for (const [id, quantity] of Object.entries(quantities)) {
      const product = getProductById(id);
      if (!product || quantity <= 0) continue;

      items.push({
        id,
        name: product.name,
        image: product.image,
        quantity,
        price: product.free ? 0 : getSalePrice(product.price, product.discount),
        listPrice: product.free ? undefined : product.price,
        discount: product.discount,
        free: product.free,
        category: product.category,
      });
    }

    const plan = getPlanById(selectedPlanId);
    if (plan && plan.price > 0) {
      items.push({
        id: plan.id,
        name: plan.name,
        image: "",
        quantity: 1,
        price: getSalePrice(plan.price, plan.discount),
        listPrice: plan.price,
        discount: plan.discount,
        category: "plan",
      });
    }

    return items;
  }, [quantities, selectedPlanId]);
}

export function useCategoryCount(category: ProductCategory) {
  const quantities = useQuantities();

  return useMemo(
    () =>
      Object.entries(quantities).reduce((count, [id, quantity]) => {
        const product = getProductById(id);
        if (product?.category === category && quantity > 0) {
          return count + quantity;
        }
        return count;
      }, 0),
    [quantities, category]
  );
}

export function useBuilderTotals() {
  const quantities = useQuantities();
  const selectedPlanId = useSelectedPlanId();

  return useMemo(() => {
    let subtotal = 0;
    let originalTotal = 0;

    for (const [id, quantity] of Object.entries(quantities)) {
      const product = getProductById(id);
      if (!product || quantity <= 0 || product.free) continue;

      const salePrice = getSalePrice(product.price, product.discount);
      subtotal += salePrice * quantity;
      originalTotal += product.price * quantity;
    }

    const plan = getPlanById(selectedPlanId);
    const monthlyTotal = plan ? getSalePrice(plan.price, plan.discount) : 0;

    const savings = Math.max(originalTotal - subtotal, 0);
    const total = subtotal;
    const shippingOriginal = 5.99;

    return {
      subtotal,
      originalTotal:
        originalTotal > subtotal
          ? originalTotal + shippingOriginal
          : subtotal + savings + shippingOriginal,
      savings,
      total,
      monthlyTotal,
      monthlyEstimate: total / 12 + monthlyTotal,
      shippingOriginal,
    };
  }, [quantities, selectedPlanId]);
}
