import { cameras } from "@/data/cameras";
import { plans } from "@/data/plans";
import { protection } from "@/data/protection";
import { sensors } from "@/data/sensors";
import type { Plan, Product } from "@/types/builder";

export const allProducts: Product[] = [...cameras, ...sensors, ...protection];

export function getProductById(id: string): Product | undefined {
  return allProducts.find((product) => product.id === id);
}

export function getPlanById(id: string): Plan | undefined {
  return plans.find((plan) => plan.id === id);
}

export function getProductsByCategory(
  category: Product["category"]
): Product[] {
  return allProducts.filter((product) => product.category === category);
}
