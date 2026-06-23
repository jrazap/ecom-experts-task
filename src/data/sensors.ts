import type { Product } from "@/types/builder";

export const sensors: Product[] = [
  {
    id: "motion-sensor",
    name: "Wyze Sense Motion Sensor",
    description: "Compact motion sensor for any room.",
    image: "/sensors/sensor-01.png",
    price: 14.49,
    category: "sensors",
  },
  {
    id: "sense-hub",
    name: "Wyze Sense Hub (Required)",
    description: "Central hub for Wyze Sense sensors.",
    image: "/sensors/sensor-02.png",
    price: 0,
    category: "sensors",
    free: true,
    required: true,
  },
];
