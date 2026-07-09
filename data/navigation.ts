import type { NavItem } from "@/types";

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Departments",
    href: "/departments",
    children: [
      { label: "Fresh Produce", href: "/departments/fresh-produce" },
      { label: "Master Butchery", href: "/departments/butchery" },
      { label: "Scratch Bakery", href: "/departments/bakery" },
      { label: "Hot Foods & Deli", href: "/departments/deli" },
      { label: "Grocery & Pantry", href: "/departments/grocery" },
      { label: "Beverages", href: "/departments/beverages" },
    ],
  },
  {
    label: "Promotions",
    href: "/promotions",
    children: [
      { label: "Monthly Specials", href: "/promotions/monthly-specials" },
      { label: "Market Day", href: "/promotions/market-day" },
      { label: "Mid-Month Specials", href: "/promotions/mid-month" },
      { label: "Month-End Specials", href: "/promotions/month-end" },
    ],
  },
  {
    label: "Discover",
    href: "#",
    children: [
      { label: "Recipes", href: "/recipes" },
      { label: "Tips 4 You", href: "/tips" },
      { label: "Community", href: "/community" },
      { label: "Activations", href: "/activations" },
      { label: "Gallery", href: "/gallery" },
      { label: "Competitions", href: "/competitions" },
    ],
  },
  {
    label: "Consumer Services",
    href: "/consumer-services",
  },
  { label: "Store Locator", href: "/store-locator" },
  {
    label: "Corporate",
    href: "#",
    children: [
      { label: "Head Office", href: "/head-office" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const footerNav = {
  explore: [
    { label: "About Checkstar", href: "/about" },
    { label: "Our Departments", href: "/departments" },
    { label: "Recipes & Inspiration", href: "/recipes" },
    { label: "Community Impact", href: "/community" },
    { label: "Gallery", href: "/gallery" },
    { label: "Activations", href: "/activations" },
  ],
  promotions: [
    { label: "Monthly Specials", href: "/promotions/monthly-specials" },
    { label: "Market Day", href: "/promotions/market-day" },
    { label: "Mid-Month Specials", href: "/promotions/mid-month" },
    { label: "Month-End Specials", href: "/promotions/month-end" },
    { label: "Competitions", href: "/competitions" },
  ],
  support: [
    { label: "Consumer Services", href: "/consumer-services" },
    { label: "Store Locator", href: "/store-locator" },
    { label: "Tips 4 You", href: "/tips" },
    { label: "Careers", href: "/careers" },
    { label: "Become a Supplier", href: "/head-office" },
    { label: "Contact Us", href: "/contact" },
  ],
};
