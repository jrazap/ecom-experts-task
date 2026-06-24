import { getProductById } from "@/lib/catalog";
import { create } from "zustand";

interface BuilderState {
  quantities: Record<string, number>;
  options: Record<string, string>;
  selectedPlanId: string;

  increase: (id: string) => void;
  decrease: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  setOption: (id: string, value: string) => void;
  setPlan: (id: string) => void;
}

const defaultQuantities: Record<string, number> = {
  "cam-v4": 1,
  "cam-pan-v3": 1,
  "motion-sensor": 2,
  "sense-hub": 1,
  "microsd-256": 2,
};

const defaultOptions: Record<string, string> = {
  "cam-v4": "white",
  "cam-pan-v3": "white",
};

export const useBuilderStore = create<BuilderState>((set) => ({
  quantities: defaultQuantities,
  options: defaultOptions,
  selectedPlanId: "cam-unlimited",

  increase: (id) =>
    set((state) => {
      const product = getProductById(id);
      const next = (state.quantities[id] ?? 0) + 1;
      const options = { ...state.options };

      if (product?.options?.length && !options[id]) {
        options[id] = product.options[0].value;
      }

      return {
        quantities: { ...state.quantities, [id]: next },
        options,
      };
    }),

  decrease: (id) =>
    set((state) => {
      const product = getProductById(id);
      const current = state.quantities[id] ?? 0;

      if (product?.required) {
        return state;
      }

      if (current <= 1) {
        const quantities = { ...state.quantities };
        delete quantities[id];
        return { quantities };
      }

      return {
        quantities: { ...state.quantities, [id]: current - 1 },
      };
    }),

  setQuantity: (id, quantity) =>
    set((state) => {
      const product = getProductById(id);

      if (product?.required && quantity < 1) {
        return state;
      }

      if (quantity <= 0) {
        const quantities = { ...state.quantities };
        delete quantities[id];
        return { quantities };
      }

      const options = { ...state.options };
      if (product?.options?.length && !options[id]) {
        options[id] = product.options[0].value;
      }

      return {
        quantities: { ...state.quantities, [id]: quantity },
        options,
      };
    }),

  setOption: (id, value) =>
    set((state) => ({
      options: { ...state.options, [id]: value },
    })),

  setPlan: (selectedPlanId) => set({ selectedPlanId }),
}));
