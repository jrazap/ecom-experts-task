import type { Product } from "@/types/builder";

export const cameras: Product[] = [
  {
    id: "cam-v4",
    name: "Wyze Cam v4",
    description: "The clearest Wyze Cam ever made.",
    image: "/cameras/camera-01-white.webp",
    price: 35.98,
    discount: 22,
    badge: "Save 22%",
    category: "cameras",
    options: [
      {
        label: "White",
        value: "white",
        image: "/cameras/camera-01-white.webp",
      },
      { label: "Grey", value: "grey", image: "/cameras/camera-01-grey.webp" },
      {
        label: "Black",
        value: "black",
        image: "/cameras/camera-01-black.webp",
      },
    ],
  },
  {
    id: "cam-pan-v3",
    name: "Wyze Cam Pan v3",
    description: "360° pan and 180° tilt security camera.",
    image: "/cameras/camera-02-white.webp",
    price: 39.98,
    discount: 12,
    badge: "Save 12%",
    category: "cameras",
    options: [
      {
        label: "White",
        value: "white",
        image: "/cameras/camera-02-white.webp",
      },
      {
        label: "Black",
        value: "black",
        image: "/cameras/camera-02-black.webp",
      },
    ],
  },
  {
    id: "cam-floodlight-v2",
    name: "Wyze Cam Floodlight v2",
    description:
      "2K floodlight camera with a 160° wide-angle view for your garage.",
    image: "/cameras/camera-03-white.webp",
    price: 89.98,
    discount: 22,
    badge: "Save 22%",
    category: "cameras",
    options: [
      {
        label: "White",
        value: "white",
        image: "/cameras/camera-03-white.webp",
      },
      {
        label: "Black",
        value: "black",
        image: "/cameras/camera-03-black.webp",
      },
    ],
  },
  {
    id: "cam-doorbell",
    name: "Wyze Duo Cam Doorbell",
    description: "Dual-camera video doorbell with chime.",
    image: "/cameras/camera-04-black.webp",
    price: 69.98,
    category: "cameras",
  },
  {
    id: "cam-battery-pro",
    name: "Wyze Battery Cam Pro",
    description: "Wire-free camera with radar-powered motion detection.",
    image: "/cameras/camera-05-white.webp",
    price: 89.98,
    category: "cameras",
    options: [
      {
        label: "White",
        value: "white",
        image: "/cameras/camera-05-white.webp",
      },
      {
        label: "Black",
        value: "black",
        image: "/cameras/camera-05-black.webp",
      },
    ],
  },
];
