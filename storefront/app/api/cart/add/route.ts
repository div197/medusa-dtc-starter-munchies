import { NextRequest, NextResponse } from "next/server";
import medusa from "@/data/medusa/client";
import { cookies } from "next/headers";

async function getAuthHeaders(): Promise<{ authorization: string } | NonNullable<unknown>> {
  const token = (await cookies()).get("_medusa_jwt")?.value;
  if (token) {
    return { authorization: `Bearer ${token}` };
  }
  return {};
}

async function getCartId() {
  return (await cookies()).get("_medusa_cart_id")?.value;
}

async function setCartId(cartId: string) {
  (await cookies()).set("_medusa_cart_id", cartId, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function POST(request: NextRequest) {
  try {
    const { quantity, region_id, variantId } = await request.json();

    if (!variantId) {
      return NextResponse.json(
        { error: "Missing variant ID" },
        { status: 400 }
      );
    }

    let cartId = await getCartId();

    if (!cartId) {
      if (!region_id) {
        return NextResponse.json(
          { error: "Missing region ID" },
          { status: 400 }
        );
      }

      // Create a new cart
      const cartResponse = await medusa.store.cart.create(
        { region_id },
        {
          fields:
            "+items, +region, +items.product.*, +items.variant.image, +items.variant.*, +items.thumbnail, +items.metadata, +promotions.*,",
        },
        await getAuthHeaders()
      );

      cartId = cartResponse.cart.id;
      await setCartId(cartId);
    }

    // Add item to cart
    const result = await medusa.store.cart.createLineItem(
      cartId,
      {
        quantity,
        variant_id: variantId,
      },
      {},
      await getAuthHeaders()
    );

    return NextResponse.json({ success: true, cart: result.cart });
  } catch (error: any) {
    console.error("Error adding to cart:", error);
    return NextResponse.json(
      { error: error.message || "Failed to add to cart" },
      { status: 500 }
    );
  }
}