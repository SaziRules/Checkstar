import type { Promotion } from "@/types";

export const promotions: Promotion[] = [
  {
    id: "monthly-july-2026",
    title: "July Monthly Specials",
    type: "monthly",
    badge: "Monthly",
    validFrom: "2026-07-01",
    validTo: "2026-07-31",
    description:
      "Our biggest monthly catalogue featuring hundreds of products at unbeatable prices across every department.",
    longDescription:
      "Every month, Checkstar's buying team negotiates directly with suppliers to bring you the biggest possible savings across every aisle. The July Monthly Specials catalogue covers over 200 product lines — from farm-fresh produce and master butchery cuts to pantry staples and household essentials. Shop in-store at any Checkstar branch to take advantage of these prices.",
    highlights: [
      { label: "Fresh Produce", note: "Over 40 fresh fruit & vegetable specials" },
      { label: "Master Butchery", note: "Premium cuts at month-best prices" },
      { label: "Scratch Bakery", note: "Breads, pastries & confectionery deals" },
      { label: "Grocery & Pantry", note: "Household staples & branded products" },
      { label: "Beverages", note: "Cold drinks, juices & bulk water" },
      { label: "Hot Foods & Deli", note: "Ready meals, cheeses & deli meats" },
    ],
    pdfUrl: "/specials/1.pdf",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=1400",
    isActive: true,
  },
  {
    id: "market-day-july-2026",
    title: "Market Day — 11 July 2026",
    type: "market-day",
    badge: "Market Day",
    validFrom: "2026-07-11",
    validTo: "2026-07-11",
    description:
      "One day only. Extraordinary prices on fresh produce, butchery, and bakery specials. Don't miss it.",
    longDescription:
      "Market Day is Checkstar's flagship one-day event — a single Friday where our fresh departments pull out all the stops. Our blockmen prepare exclusive cuts, the bakery works overnight for fresh stock, and our produce team sources directly from farmers for same-day delivery to shelf. These prices are available in-store only, while stocks last.",
    highlights: [
      { label: "Super Fresh Produce", note: "Direct from KZN farms — same-day stock" },
      { label: "Master Butchery", note: "Exclusive one-day cuts you won't find elsewhere" },
      { label: "Scratch Bakery", note: "Overnight baked breads & market specials" },
      { label: "Hot Foods & Deli", note: "Market Day grills & prepared platters" },
    ],
    pdfUrl: "/specials/2.pdf",
    image:
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=1400",
    isActive: true,
  },
  {
    id: "mid-month-july-2026",
    title: "Mid-Month Specials",
    type: "mid-month",
    badge: "Mid-Month",
    validFrom: "2026-07-14",
    validTo: "2026-07-20",
    description:
      "Halfway through the month and your budget needs a boost. These deals have you covered.",
    longDescription:
      "When the middle of the month hits and budgets are tight, Checkstar's Mid-Month Specials are designed to stretch every rand. Focused on grocery essentials, cleaning products, and personal care, these deals help you restock the pantry without breaking the bank. Available for one week only — 14 to 20 July 2026.",
    highlights: [
      { label: "Grocery & Pantry", note: "Mid-month staples at value prices" },
      { label: "Beverages", note: "Bulk buy deals on soft drinks & juices" },
      { label: "Cleaning & Household", note: "Value packs on detergents & cleaners" },
      { label: "Personal Care", note: "Beauty, hygiene & everyday toiletries" },
    ],
    pdfUrl: "/specials/3.pdf",
    image:
      "https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&q=80&w=1400",
    isActive: false,
  },
  {
    id: "month-end-july-2026",
    title: "Month-End Specials",
    type: "month-end",
    badge: "Month-End",
    validFrom: "2026-07-25",
    validTo: "2026-07-31",
    description:
      "Stretch your month-end budget further with our specially curated value deals on everyday essentials.",
    longDescription:
      "As month-end approaches, Checkstar's buying team curates a targeted selection of high-volume, high-value deals to help families stock up before the new month starts. Focused on bulk buying, frozen goods, canned foods, and dry pantry items — these are the deals that stretch your money the furthest. In-store at all Checkstar branches from 25 to 31 July.",
    highlights: [
      { label: "Household Staples", note: "Essential items at budget-friendly prices" },
      { label: "Bulk Buying Value", note: "Family-size packs at significant savings" },
      { label: "Frozen Foods", note: "Freeze & save on meats, veggies & meals" },
      { label: "Canned & Dry Goods", note: "Stock up on pantry essentials" },
    ],
    pdfUrl: undefined,
    image:
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&q=80&w=1400",
    isActive: false,
  },
];

export const activePromotions = promotions.filter((p) => p.isActive);

export const TYPE_TO_SLUG: Record<Promotion["type"], string> = {
  monthly: "monthly-specials",
  "market-day": "market-day",
  "mid-month": "mid-month",
  "month-end": "month-end",
};

export const SLUG_TO_TYPE: Record<string, Promotion["type"]> = {
  "monthly-specials": "monthly",
  "market-day": "market-day",
  "mid-month": "mid-month",
  "month-end": "month-end",
};
