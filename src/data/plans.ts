import type { Plan } from "@/types/builder";

export const plans: Plan[] = [
  {
    id: "cam-unlimited",
    name: "Cam Unlimited",
    price: 12.99,
    description: "Unlimited cloud storage for all your Wyze cams.",
  },
  {
    id: "cam-plus",
    name: "Cam Plus",
    price: 2.99,
    description: "14-day cloud storage and smart detections.",
  },
  {
    id: "no-plan",
    name: "No plan",
    price: 0,
    description: "Skip a monitoring plan for now.",
  },
];
