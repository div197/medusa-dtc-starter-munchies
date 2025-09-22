"use client";

import type { AddToCartEventPayload } from "@/components/global/header/cart/event-bus";

// Client-side wrapper for cart actions
export async function addToCartAction(payload: {
  quantity: number;
  region_id: string;
  variantId: string;
}) {
  const response = await fetch("/api/cart/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Failed to add to cart");
  }

  return response.json();
}