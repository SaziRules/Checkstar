import type { CommunityStory } from "@/types";

export const communityStats = [
  { value: "10 000+", label: "Meals served weekly" },
  { value: "100%", label: "Local SA suppliers" },
  { value: "200+", label: "Jobs created locally" },
  { value: "15+", label: "Schools supported" },
];

export const communityStories: CommunityStory[] = [
  {
    id: "feeding-scheme",
    title: "Weekly Community Feeding Programme",
    excerpt:
      "Every Friday, Checkstar prepares and donates over 500 freshly cooked meals to families in surrounding communities. Not because we have to — because we live here too.",
    image: {
      src: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800",
      alt: "Community feeding programme volunteers serving meals",
    },
    category: "Feeding",
    date: "2026-07-01",
  },
  {
    id: "school-support",
    title: "Partnering with Local Schools",
    excerpt:
      "From sponsoring sports days to providing stationery packs at the start of each school year, Checkstar invests in the next generation of our community.",
    image: {
      src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
      alt: "Children receiving school supplies",
    },
    category: "Education",
    date: "2026-06-15",
  },
  {
    id: "local-farmers",
    title: "Supporting Regional Farmers",
    excerpt:
      "We source directly from over 40 local KwaZulu-Natal farms. No middlemen, fair prices for farmers, fresh produce for you.",
    image: {
      src: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800",
      alt: "Local South African farmer in the field",
    },
    category: "Farming",
    date: "2026-05-20",
  },
];
