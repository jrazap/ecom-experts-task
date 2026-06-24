export type ProductCategory =
  | "cameras"
  | "sensors"
  | "accessories"
  | "protection";

export interface ProductOption {
  label: string;
  value: string;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  discount?: number;
  badge?: string;
  options?: ProductOption[];
  category: ProductCategory;
  free?: boolean;
  required?: boolean;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  discount?: number;
  description?: string;
}

export type BuilderStep = "cameras" | "plan" | "sensors" | "protection";
