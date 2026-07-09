import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Checkstar Supermarket | Freshness. Value. Community.",
    template: "%s | Checkstar Supermarket",
  },
  description:
    "South Africa's premier independent community supermarket. Fresh produce, master butchery, scratch bakery — and unmatched value at every aisle. Proudly serving KwaZulu-Natal.",
  keywords: [
    "Checkstar",
    "supermarket",
    "South Africa",
    "KwaZulu-Natal",
    "Durban",
    "fresh produce",
    "butchery",
    "weekly specials",
    "community",
  ],
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: "Checkstar Supermarket",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-ZA"
      className={`${jakarta.variable} ${caveat.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-white text-ink antialiased">
        <AnnouncementBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
