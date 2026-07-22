export interface HeroSlide {
  id: string;
  eyebrow: string;
  headline: (string | { plain: string; highlight: string })[];
  subtext: string;
  cta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  image: { src: string; alt: string };
  theme?: "dark" | "light";
  variant?: "app";
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface Store {
  id: string;
  name: string;
  address: string;
  suburb: string;
  city: string;
  province: string;
  phone: string;
  email?: string;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
    publicHolidays?: string;
    fridayNote?: string;
  };
  coordinates?: { lat: number; lng: number };
  image?: string;
  isOpen?: boolean;
  services: string[];
}

export interface Department {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  image: { src: string; alt: string };
  href: string;
}

export interface Promotion {
  id: string;
  title: string;
  type: "monthly" | "market-day" | "mid-month" | "month-end";
  badge: string;
  validFrom: string;
  validTo: string;
  description: string;
  longDescription?: string;
  highlights?: { label: string; note: string }[];
  pdfUrl?: string;
  image?: string;
  isActive: boolean;
}

export interface Recipe {
  id: string;
  title: string;
  slug: string;
  category: string;
  prepTime: string;
  cookTime: string;
  difficulty: "Easy" | "Medium" | "Advanced";
  servings: number;
  description: string;
  image: { src: string; alt: string };
  tags: string[];
  featured?: boolean;
  ingredients?: string[];
  method?: string[];
  tip?: string;
}

export interface CommunityStory {
  id: string;
  title: string;
  excerpt: string;
  image: { src: string; alt: string };
  category: string;
  date: string;
}

export interface TipSection {
  heading?: string;
  body: string[];
}

export interface Tip {
  id: string;
  title: string;
  slug: string;
  category: "Shopping" | "Storage" | "Cooking" | "Health" | "Budget" | "Seasonal";
  excerpt: string;
  date: string;
  readTime: string;
  image: { src: string; alt: string };
  tags: string[];
  featured?: boolean;
  intro: string;
  sections: TipSection[];
  keyTakeaways?: string[];
}
