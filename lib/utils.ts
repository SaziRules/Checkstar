import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(cents: number): string {
  return `R${(cents / 100).toFixed(2)}`;
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function isStoreOpen(hours: { weekdays: string; saturday: string; sunday: string }): boolean {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();

  // Simplified: Mon–Fri open 7–19, Sat 7–18, Sun 8–14
  if (day >= 1 && day <= 5) return hour >= 7 && hour < 19;
  if (day === 6) return hour >= 7 && hour < 18;
  return hour >= 8 && hour < 14;
}
