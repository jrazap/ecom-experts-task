import { useMemo } from "react";

import { getPlanById, getProductById } from "@/lib/catalog";
import type { ProductCategory } from "@/types/builder";

import { useBuilderStore } from "./builder.store";

export interface LineItem {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
  oldPrice?: number;
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
        price: product.free ? 0 : product.price,
        oldPrice: product.free ? undefined : product.oldPrice,
        free: product.free,
        category: product.category,
      });
    }

    const plan = getPlanById(selectedPlanId);
    if (plan && plan.price > 0) {
      items.push({
        id: plan.id,
        name: plan.name,
        image: "/products/plan.png",
        quantity: 1,
        price: plan.price,
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

      subtotal += product.price * quantity;
      originalTotal += (product.oldPrice ?? product.price) * quantity;
    }

    const plan = getPlanById(selectedPlanId);
    const monthlyTotal = plan?.price ?? 0;

    const savings = Math.max(originalTotal - subtotal, 0);
    const total = subtotal;

    return {
      subtotal,
      originalTotal:
        originalTotal > subtotal ? originalTotal : subtotal + savings,
      savings,
      total,
      monthlyTotal,
      monthlyEstimate: total / 12 + monthlyTotal,
    };
  }, [quantities, selectedPlanId]);
}
