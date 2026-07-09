import type { Department } from "@/types";

export const departments: Department[] = [
  {
    id: "produce",
    name: "Fresh Produce",
    slug: "fresh-produce",
    tagline: "Farm to floor in 24 hours",
    description:
      "Crisp, vibrant produce sourced directly from regional South African farmers. No long-haul cold chains, no compromise.",
    image: {
      src: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800",
      alt: "Abundant fresh fruit and vegetables at Checkstar",
    },
    href: "/departments/fresh-produce",
  },
  {
    id: "butchery",
    name: "Master Butchery",
    slug: "butchery",
    tagline: "Custom cuts, expert hands",
    description:
      "Our community blockmen prepare every cut on site, daily. Premium AAA-grade beef, free-range poultry, and artisanal marinades.",
    image: {
      src: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&q=80&w=800",
      alt: "Expert butcher preparing premium cuts at Checkstar",
    },
    href: "/departments/butchery",
  },
  {
    id: "bakery",
    name: "Scratch Bakery",
    slug: "bakery",
    tagline: "Hot from the oven, every hour",
    description:
      "Artisanal breads, confectionery, and custom catering pastries baked entirely from scratch. The smell alone is worth the visit.",
    image: {
      src: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",
      alt: "Fresh baked bread loaves at Checkstar bakery",
    },
    href: "/departments/bakery",
  },
  {
    id: "deli",
    name: "Hot Foods & Deli",
    slug: "deli",
    tagline: "Grab-and-go, restaurant quality",
    description:
      "Rotisserie chicken, prepared meals, sliced meats, and specialty cheeses — all freshly prepared by our in-store culinary team.",
    image: {
      src: "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&q=80&w=800",
      alt: "Hot prepared foods at Checkstar deli counter",
    },
    href: "/departments/deli",
  },
  {
    id: "grocery",
    name: "Grocery & Pantry",
    slug: "grocery",
    tagline: "Everything your family needs",
    description:
      "A curated selection of household staples, international products, and local favourites at prices that respect your budget.",
    image: {
      src: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=800",
      alt: "Well-stocked grocery aisles at Checkstar",
    },
    href: "/departments/grocery",
  },
  {
    id: "beverages",
    name: "Beverages",
    slug: "beverages",
    tagline: "Cold, refreshing, and ready",
    description:
      "From fresh juices and craft cold drinks to everyday soft drinks and bulk water — a full beverage collection for every occasion.",
    image: {
      src: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&q=80&w=800",
      alt: "Beverage selection at Checkstar",
    },
    href: "/departments/beverages",
  },
];
