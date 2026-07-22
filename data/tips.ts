import type { Tip } from "@/types";

export const tips: Tip[] = [
  /* ── Storage ─────────────────────────────────────────────────────────────── */
  {
    id: "produce-fresh",
    title: "How to Keep Your Produce Fresh for Longer",
    slug: "keep-produce-fresh",
    category: "Storage",
    excerpt:
      "Simple storage habits that cut waste, save money, and keep your fruits and vegetables crisp and flavourful all week long.",
    date: "2026-07-10",
    readTime: "4 min read",
    image: {
      src: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200",
      alt: "Fresh fruits and vegetables",
    },
    tags: ["Storage", "Produce", "Reduce Waste"],
    featured: true,
    intro:
      "Fresh produce is one of the most valuable — and most perishable — things in your kitchen. A few smart storage habits are the difference between produce that lasts the week and greens that go limp by Wednesday.",
    sections: [
      {
        heading: "Separate your ethylene producers",
        body: [
          "Some fruits — apples, bananas, avocados, and tomatoes — release ethylene gas as they ripen. That gas speeds up the ripening and eventual rotting of nearby produce.",
          "Keep ethylene-producing fruits away from leafy greens, carrots, and berries. A bunch of bananas next to your salad leaves is a recipe for disappointment by day three.",
        ],
      },
      {
        heading: "Moisture: friend or enemy?",
        body: [
          "Leafy greens love moisture. Store them in a sealed container with a slightly damp paper towel — this keeps them crisp for up to five days.",
          "Mushrooms are the opposite — they go slimy in sealed plastic. Keep them in a paper bag in the fridge so moisture can escape.",
          "Potatoes, onions, and garlic hate both moisture and cold. Store them in a cool, dry, ventilated spot in your pantry, never the fridge.",
        ],
      },
      {
        heading: "Your fridge has microclimates",
        body: [
          "The coldest part of most fridges is the back of the bottom shelf — ideal for raw meat and dairy.",
          "The crisper drawers are engineered for produce. Use the lower-humidity drawer for fruits and the higher-humidity drawer for vegetables.",
          "The door is the warmest spot, best reserved for condiments and juice — not dairy or eggs.",
        ],
      },
      {
        heading: "Whole always outlasts cut",
        body: [
          "Uncut produce lasts significantly longer than cut produce. If you've halved a butternut or sliced cucumber, cover the exposed sides and plan to use them within two days.",
          "Half an avocado? Leave the pit in, squeeze lemon juice on the flesh, and wrap it tightly. It'll hold in the fridge for another day or two.",
        ],
      },
    ],
    keyTakeaways: [
      "Keep ethylene-producing fruits away from vegetables and berries",
      "Damp paper towels in a sealed container keep leafy greens crisp",
      "Potatoes, onions, and garlic belong in a cool pantry — not the fridge",
      "Cut produce lasts far less time than whole — use within two days",
    ],
  },

  {
    id: "meat-storage",
    title: "Safe Meat Storage at Home",
    slug: "safe-meat-storage",
    category: "Storage",
    excerpt:
      "From the butchery counter to your freezer — how to store fresh meat safely so it stays at its best and keeps your family safe.",
    date: "2026-06-18",
    readTime: "3 min read",
    image: {
      src: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=1200",
      alt: "Fresh meat cuts from the butchery",
    },
    tags: ["Storage", "Meat", "Food Safety"],
    featured: false,
    intro:
      "Checkstar's Master Butchery cuts fresh every day — but once you get that meat home, storage matters. Here's how to handle it correctly from the moment you walk in the door.",
    sections: [
      {
        heading: "Fridge vs. freezer: know the limits",
        body: [
          "Fresh mince and chicken should be used within 1–2 days of purchase if kept in the fridge. Whole cuts like lamb chops or beef steak can last up to 3–4 days.",
          "If you're not cooking within that window, freeze it immediately when you get home — don't wait until it's almost at its use-by date.",
        ],
      },
      {
        heading: "Bottom shelf is non-negotiable",
        body: [
          "Always store raw meat on the bottom shelf of the fridge, below cooked food and produce. This prevents raw meat juices from dripping onto anything else.",
          "Use a plate or sealed container — never leave meat sitting directly on the fridge shelf with just the supermarket wrapping.",
        ],
      },
      {
        heading: "Freeze smart",
        body: [
          "Divide meat into meal-sized portions before freezing so you only thaw what you need. Wrap tightly in cling film and then in foil, or use a zip-lock freezer bag with the air pressed out.",
          "Label everything with the date. Beef and lamb keep well for up to 4 months in the freezer; chicken for up to 3 months; mince for 2–3 months.",
        ],
      },
      {
        heading: "Thaw safely — never on the counter",
        body: [
          "The safest way to thaw meat is in the fridge overnight. If you need it faster, submerge the sealed package in cold water and change the water every 30 minutes.",
          "Never thaw meat at room temperature on the counter. Bacteria multiply rapidly in the 'danger zone' between 5°C and 60°C.",
        ],
      },
    ],
    keyTakeaways: [
      "Use fresh mince and chicken within 1–2 days; whole cuts within 3–4 days",
      "Raw meat always goes on the bottom shelf, sealed",
      "Freeze in meal-sized portions, labelled with the date",
      "Thaw in the fridge or in cold water — never on the counter",
    ],
  },

  /* ── Budget ───────────────────────────────────────────────────────────────── */
  {
    id: "stretch-budget",
    title: "5 Ways to Stretch Your Grocery Budget",
    slug: "stretch-grocery-budget",
    category: "Budget",
    excerpt:
      "Getting more from every rand you spend isn't about buying less — it's about buying smarter. Here's how to make your shopping trip work harder for you.",
    date: "2026-07-01",
    readTime: "5 min read",
    image: {
      src: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=1200",
      alt: "Smart grocery shopping",
    },
    tags: ["Budget", "Planning", "Value"],
    featured: true,
    intro:
      "Grocery costs are one of the biggest weekly expenses for most families — but with a few intentional habits, you can significantly reduce your spend without sacrificing quality or variety.",
    sections: [
      {
        heading: "1. Plan before you shop",
        body: [
          "A shopping list built around a weekly meal plan is the single biggest money-saver. When you know exactly what you need, you avoid the two killers: impulse purchases and forgotten ingredients that force expensive top-up trips.",
          "Check what's already in your pantry and fridge before writing your list — you'd be surprised how much food is already there.",
        ],
      },
      {
        heading: "2. Shop the specials, then build your meals",
        body: [
          "Check our current promotions before you plan your meals for the week. If chicken is on Market Day special, build two or three meals around it. Let the deals shape the menu, not the other way around.",
          "Our Market Day, Mid-Month, and Month-End specials run on a schedule — once you know the pattern, you can plan around them.",
        ],
      },
      {
        heading: "3. Buy whole, not pre-cut",
        body: [
          "Pre-cut butternut, sliced biltong, and trimmed beans are convenient, but you pay a premium for that convenience. Whole vegetables and full cuts are consistently better value.",
          "A whole chicken from our butchery costs significantly less per kilogram than individual portions. You can break it down yourself in minutes, and the carcass makes stock.",
        ],
      },
      {
        heading: "4. Embrace legumes and eggs",
        body: [
          "Lentils, dried beans, and eggs are among the best sources of protein per rand. They stretch further than meat, absorb flavour beautifully, and keep your family full.",
          "Swap out one or two meat-based dinners per week for a lentil curry or a frittata. The savings add up quickly over a month.",
        ],
      },
      {
        heading: "5. Don't shop hungry",
        body: [
          "It sounds obvious, but shopping on an empty stomach demonstrably leads to more spending. Eat something before you go, stick to your list, and move through the aisles with intention.",
          "If you have children with you, set a clear expectation before you enter the store — and reward the trip with something small if they stick to the plan.",
        ],
      },
    ],
    keyTakeaways: [
      "A meal plan before you shop eliminates impulse buys and wasted food",
      "Build meals around current specials rather than shopping regardless of price",
      "Whole cuts and unprepared vegetables are always better value than pre-cut",
      "Legumes and eggs are your best high-protein, low-cost options",
    ],
  },

  {
    id: "bulk-buying",
    title: "Bulk Buying: When It's Worth It (and When It's Not)",
    slug: "bulk-buying-guide",
    category: "Budget",
    excerpt:
      "Buying in bulk can save you money — but only if you buy the right things. Here's a clear guide to what's worth buying in volume and what you should leave in singles.",
    date: "2026-05-22",
    readTime: "3 min read",
    image: {
      src: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80&w=1200",
      alt: "Supermarket aisle with bulk products",
    },
    tags: ["Budget", "Bulk", "Planning"],
    featured: false,
    intro:
      "Bulk buying looks like a bargain on paper — and sometimes it genuinely is. But buying a large quantity of something you won't finish before it spoils is more expensive than buying small. Here's how to tell the difference.",
    sections: [
      {
        heading: "Always worth buying in bulk",
        body: [
          "Non-perishables with a long shelf life are always good bulk buys: cooking oil, rice, pasta, sugar, flour, tinned tomatoes, tinned beans, and canned fish.",
          "Household consumables — toilet paper, dishwashing liquid, laundry powder — are prime bulk candidates. They don't spoil, and the per-unit saving is real.",
          "Frozen goods are a practical bulk buy if you have freezer space: frozen vegetables, frozen fish, and frozen meat all hold well.",
        ],
      },
      {
        heading: "Bulk-buy with caution",
        body: [
          "Fresh produce in bulk only makes sense if you'll use it all within a few days, or if you plan to freeze or cook it immediately. Three heads of cabbage for a household of two is a waste.",
          "Bread, fresh baked goods, and dairy in large quantities are only worth it if you have the space and the appetite. A 2kg bag of cheese sounds like value — until you're throwing away the last third.",
        ],
      },
      {
        heading: "The true cost calculation",
        body: [
          "Always calculate the price per 100g or per unit rather than comparing pack sizes directly. A larger pack isn't always cheaper per unit — it just looks like more value because the total price is higher.",
          "If you're splitting a bulk purchase with a friend or neighbour, the savings can be excellent without the storage or spoilage problem.",
        ],
      },
    ],
    keyTakeaways: [
      "Non-perishables and household consumables are ideal bulk purchases",
      "Fresh produce in bulk only works if you'll use or freeze it immediately",
      "Always compare price per 100g — not total pack size",
      "Splitting bulk purchases with someone else gives you the saving without the risk",
    ],
  },

  /* ── Shopping ─────────────────────────────────────────────────────────────── */
  {
    id: "butchery-guide",
    title: "Choosing the Right Cut: A Guide to Our Butchery",
    slug: "butchery-cut-guide",
    category: "Shopping",
    excerpt:
      "Not all cuts are equal — some are best for quick weeknight meals, others for long, slow Sunday cooking. Our butchery team breaks it down.",
    date: "2026-06-05",
    readTime: "5 min read",
    image: {
      src: "https://images.unsplash.com/photo-1448907503123-67254d59ca4f?auto=format&fit=crop&q=80&w=1200",
      alt: "Fresh meat cuts at the butchery counter",
    },
    tags: ["Shopping", "Butchery", "Meat", "Cooking"],
    featured: true,
    intro:
      "Walking up to the butchery counter with confidence starts with knowing what each cut does well. Different cuts suit different cooking methods — and the right choice means better results with less effort.",
    sections: [
      {
        heading: "Quick-cook cuts (20 minutes or less)",
        body: [
          "Steak (sirloin, rump, fillet), chicken breast, lamb chops, and pork loin are all quick-cook cuts — they should be cooked hot and fast over high heat. Overcook them and they become tough.",
          "These cuts are ideal for weeknight dinners: pan-fry, braai, or grill. Season simply and let the quality of the meat do the work.",
        ],
      },
      {
        heading: "Slow-cook cuts (2 hours or more)",
        body: [
          "Beef chuck, oxtail, lamb knuckle, and pork belly are tougher cuts that become extraordinary with low, slow heat. The collagen breaks down over time, creating rich, tender, fall-off-the-bone results.",
          "These cuts are more affordable per kilogram than premium quick-cook cuts — and when done right, they're more flavourful. A slow-cooked oxtail curry is worth every hour.",
        ],
      },
      {
        heading: "Mince: the most versatile cut",
        body: [
          "Beef mince is one of the most flexible things in our butchery. Bolognese, bobotie, bunny chow filling, cottage pie, meatballs, burgers — all mince-based.",
          "Buy a kilogram when it's on special, brown it with aromatics, and freeze in 250g portions. You'll have the base for four quick weeknight meals ready to go.",
        ],
      },
      {
        heading: "Asking our butchers",
        body: [
          "Our butchers at all three branches are there to help. If you tell them what you're cooking, they can recommend the right cut, trim it to your preference, and even score or marinate it for you.",
          "There's no such thing as a silly question at the counter. The more you tell us, the better the cut we can give you.",
        ],
      },
    ],
    keyTakeaways: [
      "Quick-cook cuts need high heat and short cooking time — don't overcook",
      "Slow-cook cuts are more affordable and more flavourful with patience",
      "Mince is the most versatile cut — batch cook and freeze for easy weeknights",
      "Talk to our butchers — they'll cut and prepare exactly what you need",
    ],
  },

  /* ── Cooking ──────────────────────────────────────────────────────────────── */
  {
    id: "batch-cooking",
    title: "Sunday Batch Cooking: Your Whole Week Sorted",
    slug: "sunday-batch-cooking",
    category: "Cooking",
    excerpt:
      "Two hours on a Sunday afternoon can save you hours of stress during the week. Here's a practical approach to batch cooking that actually works.",
    date: "2026-07-15",
    readTime: "6 min read",
    image: {
      src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=1200",
      alt: "Meal prep containers with healthy food",
    },
    tags: ["Cooking", "Meal Prep", "Time Saving"],
    featured: false,
    intro:
      "Batch cooking isn't about cooking the same meal five nights in a row — it's about preparing components that you can mix and match through the week. Done right, it takes about two hours on Sunday and pays dividends every evening until Friday.",
    sections: [
      {
        heading: "Think components, not meals",
        body: [
          "Instead of making five complete dishes, prepare the building blocks: a pot of rice, a batch of lentils, roasted vegetables, grilled chicken strips, and a simple tomato sauce.",
          "These components combine in different ways each night. Rice + chicken + roasted veg on Monday. Lentils + tomato sauce + toast on Tuesday. The variety keeps it interesting.",
        ],
      },
      {
        heading: "What to batch cook",
        body: [
          "Grains and legumes: rice, quinoa, lentils, and dried beans all reheat beautifully and hold well in the fridge for four to five days.",
          "Proteins: a whole roasted chicken, a batch of mince bolognese, or boiled eggs are all solid batch options. They're flexible and kid-friendly.",
          "Roasted vegetables: tray-roast whatever is in season — butternut, sweet potato, broccoli, onion. They develop more flavour than raw veg and reheat in minutes.",
        ],
      },
      {
        heading: "Storage rules",
        body: [
          "Cool cooked food to room temperature before refrigerating — but don't leave it out for more than two hours. Use airtight containers and label with the date.",
          "Most batch-cooked food keeps in the fridge for 3–4 days. Anything beyond that should go in the freezer, which extends most dishes to three months.",
        ],
      },
      {
        heading: "A simple Sunday routine",
        body: [
          "Start with the longest-cooking items first — put the rice on, get the veg in the oven, then prep the proteins. Everything finishes in roughly the same window.",
          "Clean as you go. A clean kitchen at the end of Sunday prep means a calm kitchen every evening during the week.",
        ],
      },
    ],
    keyTakeaways: [
      "Cook components (grains, proteins, veg) rather than full meals",
      "Grains and legumes hold for 4–5 days in the fridge",
      "Freeze anything you won't eat within 3–4 days",
      "Start with the longest-cooking items and clean as you go",
    ],
  },

  /* ── Health ───────────────────────────────────────────────────────────────── */
  {
    id: "food-labels",
    title: "Reading Food Labels: What Actually Matters",
    slug: "reading-food-labels",
    category: "Health",
    excerpt:
      "Food packaging can be confusing by design. Here's how to cut through the marketing noise and read the information that actually matters for your family's health.",
    date: "2026-05-08",
    readTime: "4 min read",
    image: {
      src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1200",
      alt: "Nutritious food and healthy eating",
    },
    tags: ["Health", "Nutrition", "Labels"],
    featured: false,
    intro:
      "The front of a food package is marketing. The back is information. Learning to read the nutrition facts panel and ingredient list gives you real control over what goes into your meals — and what doesn't.",
    sections: [
      {
        heading: "Serving size is the first trick",
        body: [
          "All the numbers on a nutrition panel refer to a single serving — which may be much smaller than what you'd actually eat. Check the serving size first, then multiply if needed.",
          "A packet of biscuits that says '80 calories per serving' may have 6 servings. Eating the whole packet is 480 calories — very different from what the front of the pack implies.",
        ],
      },
      {
        heading: "The ingredient list tells the truth",
        body: [
          "Ingredients are listed in order of weight — the first ingredient is the most prevalent. If sugar or refined flour is listed first or second, you're holding a product that's mostly that.",
          "A short ingredient list with recognisable words is usually a good sign. Long lists full of numbers, modified starches, and preservatives suggest a highly processed product.",
        ],
      },
      {
        heading: "Sodium: the hidden number",
        body: [
          "Sodium (salt) is worth watching on packaged, processed, and canned foods. South African adults should aim for under 2000mg of sodium per day — it's easy to hit that with just a few processed items.",
          "Look for products under 120mg of sodium per 100g as a general guide for 'low salt.'",
        ],
      },
      {
        heading: "Front-of-pack claims",
        body: [
          "'Low fat' often means higher sugar to compensate for flavour. 'No added sugar' doesn't mean sugar-free — it may be sweetened with fruit concentrate or other sugars.",
          "'Fortified with vitamins' on an otherwise poor-quality product is marketing, not nutrition. Focus on the panel, not the claims.",
        ],
      },
    ],
    keyTakeaways: [
      "Always check the serving size before reading any other numbers",
      "Ingredient lists are ordered by weight — what's first is what's most",
      "Watch sodium on packaged foods — it adds up faster than you expect",
      "Front-of-pack health claims are marketing; the panel is the truth",
    ],
  },

  /* ── Seasonal ─────────────────────────────────────────────────────────────── */
  {
    id: "seasonal-produce-kzn",
    title: "What's In Season in KZN Right Now",
    slug: "seasonal-produce-kzn",
    category: "Seasonal",
    excerpt:
      "Seasonal produce is fresher, tastier, more nutritious, and better value. Here's what's at its best in KwaZulu-Natal right now — and how to make the most of it.",
    date: "2026-07-20",
    readTime: "4 min read",
    image: {
      src: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&q=80&w=1200",
      alt: "Fresh seasonal vegetables",
    },
    tags: ["Seasonal", "Produce", "KZN", "Fresh"],
    featured: false,
    intro:
      "KwaZulu-Natal's climate means we're lucky to have fresh produce available most of the year — but what's grown locally and in-season right now is always going to be superior to what's been shipped, stored, and artificially ripened.",
    sections: [
      {
        heading: "Winter winners (June–August)",
        body: [
          "Citrus is at its absolute peak in KZN winter: oranges, naartjies, lemons, and grapefruit are sweet, juicy, and excellent value. Stock up and juice them, add to dressings, or eat them as they are.",
          "Root vegetables — carrots, sweet potato, beetroot, and turnips — are at their best and hold well. They're ideal for slow-cooked dishes and hearty soups.",
          "Leafy brassicas: cabbage, kale, and spinach thrive in KZN winters. They're versatile, nutritious, and affordable — perfect for curries, stir-fries, and sides.",
        ],
      },
      {
        heading: "Why seasonal matters",
        body: [
          "Produce picked at peak ripeness has more flavour and a better nutritional profile than produce harvested early to survive long transport. That's why a winter orange tastes nothing like an out-of-season one.",
          "Seasonal produce is also cheaper because supply is high and transport distance is typically shorter.",
        ],
      },
      {
        heading: "Ask at the fresh produce section",
        body: [
          "Our Fresh Produce team at all three branches know what's come in fresh, what's particularly good value this week, and what's been sourced locally. Don't hesitate to ask.",
          "We rotate our produce displays around what's freshest — so what you see at the front is what we'd recommend first.",
        ],
      },
    ],
    keyTakeaways: [
      "Citrus, root vegetables, and leafy greens are peak winter produce in KZN",
      "Seasonal produce is fresher, more flavourful, and better value",
      "Ask our fresh produce team what's best this week — they'll tell you honestly",
    ],
  },
];

export const featuredTips = tips.filter((t) => t.featured);
