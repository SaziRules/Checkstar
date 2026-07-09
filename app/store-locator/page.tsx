import type { Metadata } from "next";
import { stores } from "@/data/stores";
import { StoreLocatorClient } from "@/components/sections/store-locator/StoreLocatorClient";

export const metadata: Metadata = {
  title: "Store Locator | Checkstar Supermarket",
  description:
    "Find your nearest Checkstar supermarket in KwaZulu-Natal. Get directions, trading hours, and branch services for Durban, Mount Edgecombe, and Overport.",
};

export default function StoreLocatorPage() {
  return <StoreLocatorClient stores={stores} />;
}
