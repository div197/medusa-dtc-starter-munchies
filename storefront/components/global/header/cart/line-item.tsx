"use client";

import type {HttpTypes} from "@medusajs/types";

import Icon from "@/components/shared/icon";
import {formatPrice} from "@/utils/medusa/price";
import Image from "next/image";
import {useCallback} from "react";

import {useCart} from "./cart-context";

export default function LineItem(item: HttpTypes.StoreCartLineItem) {
  const {updateItem, deleteItem} = useCart();

  const handleQuantityChange = useCallback(
    async (quantity: number) => {
      if (quantity === 0) {
        await deleteItem(item.id);
      } else {
        await updateItem({
          lineId: item.id,
          quantity,
        });
      }
    },
    [deleteItem, updateItem, item.id],
  );

  return (
    <div className="flex gap-4">
      {item.thumbnail && (
        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-accent">
          <Image
            alt={item.title || item.product_title || "Product"}
            className="object-cover"
            fill
            sizes="96px"
            src={item.thumbnail}
          />
        </div>
      )}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="text-sm font-medium">
            {item.title || item.product_title || "Untitled Product"}
          </h3>
          {item.variant_title && (
            <p className="text-xs text-gray-500">{item.variant_title}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              aria-label="Decrease quantity"
              className="flex h-6 w-6 items-center justify-center rounded border border-accent text-sm"
              onClick={() => handleQuantityChange(item.quantity - 1)}
            >
              -
            </button>
            <span className="text-sm">{item.quantity}</span>
            <button
              aria-label="Increase quantity"
              className="flex h-6 w-6 items-center justify-center rounded border border-accent text-sm"
              onClick={() => handleQuantityChange(item.quantity + 1)}
            >
              +
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {formatPrice(item.unit_price, item.cart?.currency_code || "usd")}
            </span>
            <button
              aria-label="Remove item"
              className="text-gray-400 hover:text-gray-600"
              onClick={() => deleteItem(item.id)}
            >
              <Icon className="h-4 w-4" name="Trash" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}