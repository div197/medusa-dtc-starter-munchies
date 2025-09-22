export function formatPrice(amount: number, currencyCode?: string): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode?.toUpperCase() || "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return formatter.format(amount / 100); // Convert cents to dollars
}

export function formatCurrency(currencyCode: string): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode.toUpperCase(),
  });

  return formatter.format(0).replace(/[0-9.,]/g, "").trim();
}