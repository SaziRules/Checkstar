export interface MegaItem {
  label: string;
  href: string;
  description: string;
  image: { src: string; alt: string };
}

export const promotionsMega: MegaItem[] = [
  {
    label: "Monthly Specials",
    href: "/promotions/monthly-specials",
    description: "Our biggest savings — fresh deals across every department, every month",
    image: {
      src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800",
      alt: "Monthly specials at Checkstar",
    },
  },
  {
    label: "Market Day",
    href: "/promotions/market-day",
    description: "Weekly flash prices on fresh produce, butchery, and bakery",
    image: {
      src: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=800",
      alt: "Market Day fresh produce deals at Checkstar",
    },
  },
  {
    label: "Mid-Month Specials",
    href: "/promotions/mid-month",
    description: "Grocery and pantry essentials at honest mid-month value prices",
    image: {
      src: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=800",
      alt: "Mid-month grocery specials",
    },
  },
  {
    label: "Month-End Specials",
    href: "/promotions/month-end",
    description: "Stock up on household staples before the new month starts",
    image: {
      src: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=800",
      alt: "Month-end value specials at Checkstar",
    },
  },
];

export const discoverMega: MegaItem[] = [
  {
    label: "Recipes",
    href: "/recipes",
    description: "Fresh ideas from our in-store chefs and community cooks",
    image: {
      src: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&q=80&w=600",
      alt: "Recipe inspiration at Checkstar",
    },
  },
  {
    label: "Tips 4 You",
    href: "/tips",
    description: "Practical advice on cooking, storage, and healthy eating",
    image: {
      src: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&q=80&w=600",
      alt: "Cooking tips and food advice",
    },
  },
  {
    label: "Community",
    href: "/community",
    description: "See how Checkstar gives back to KwaZulu-Natal every day",
    image: {
      src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=600",
      alt: "Checkstar community involvement",
    },
  },
  {
    label: "Activations",
    href: "/activations",
    description: "In-store events, tastings, and brand activations near you",
    image: {
      src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600",
      alt: "In-store events and activations",
    },
  },
  {
    label: "Gallery",
    href: "/gallery",
    description: "A visual tour through our stores and community moments",
    image: {
      src: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=600",
      alt: "Checkstar store gallery",
    },
  },
  {
    label: "Competitions",
    href: "/competitions",
    description: "Win big with our seasonal prize competitions and giveaways",
    image: {
      src: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600",
      alt: "Checkstar competitions and prizes",
    },
  },
];
