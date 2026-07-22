import type { HeroSlide } from "@/types";

export const heroSlides: HeroSlide[] = [
  {
    id: "nownow",
    eyebrow: "NEW · Checkstar Now Now App",
    headline: ["Skip the queue.", { plain: "Shop ", highlight: "Now Now." }],
    subtext:
      "Real Checkstar quality — fresh-cut butchery, farm produce, bakery bakes — delivered to your door in under 60 minutes. No parking. No queues. Just tap, track, and done.",
    cta: { label: "Download the App", href: "https://play.google.com/store/apps/details?id=com.checkstar.za&pcampaignid=web_share" },
    secondaryCta: { label: "Learn More", href: "#app-promo" },
    image: {
      src: "/images/now-now.png",
      alt: "Person smiling while using the Checkstar Now Now delivery app at home",
    },
    variant: "app",
  },
  {
    id: "produce",
    eyebrow: "Market-fresh · Daily sourced",
    headline: ["Fresh food.", "Your community."],
    subtext:
      "From regional farms straight to your table. Visit your nearest Checkstar and taste the difference.",
    cta: { label: "Browse This Week's Specials", href: "/promotions" },
    secondaryCta: { label: "Find a Store", href: "/store-locator" },
    image: {
      src: "/images/veg.png",
      alt: "Abundant fresh produce display at Checkstar",
    },
  },
  {
    id: "butchery",
    eyebrow: "The Master Butchery",
    headline: ["Premium cuts.", "Expert hands."],
    subtext:
      "Our community blockmen prepare every cut on site. No shortcuts, no fillers — just world-class South African beef.",
    cta: { label: "View Butchery Specials", href: "/promotions/market-day" },
    secondaryCta: { label: "Our Departments", href: "/departments" },
    image: {
      src: "/images/fresh-meat.png",
      alt: "Premium fresh meat at Checkstar's master butchery",
    },
  },
  {
    id: "community",
    eyebrow: "Proudly South African · Since day one",
    headline: ["We serve. We care.", "We belong here."],
    subtext:
      "As an independent supermarket, we answer to our community — not distant shareholders. That's the Checkstar difference.",
    cta: { label: "Our Community Story", href: "/community" },
    secondaryCta: { label: "Meet Our Stores", href: "/store-locator" },
    image: {
      src: "/images/grocerry.jpg",
      alt: "Friendly Checkstar staff serving customers",
    },
  },
];
