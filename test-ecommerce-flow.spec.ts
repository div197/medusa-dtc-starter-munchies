import { test, expect } from '@playwright/test';

test.describe('E-commerce Flow', () => {
  test('Complete shopping flow from homepage to cart', async ({ page }) => {
    // 1. Homepage
    await page.goto('http://localhost:3000/gb');
    await page.screenshot({ path: 'screenshots/1-homepage.png', fullPage: true });
    await expect(page).toHaveURL(/\/gb/);

    // 2. Navigate to products
    await page.click('text=Shop');
    await page.waitForURL('**/products');
    await page.screenshot({ path: 'screenshots/2-products-page.png', fullPage: true });

    // 3. Click on first product
    const firstProduct = page.locator('[data-testid="product-card"]').first();
    const productTitle = await firstProduct.locator('h3').textContent();
    await firstProduct.click();
    await page.waitForURL('**/products/**');
    await page.screenshot({ path: 'screenshots/3-product-detail.png', fullPage: true });

    // 4. Add to cart
    const addToCartButton = page.locator('button:has-text("Add to cart")');
    await expect(addToCartButton).toBeVisible();
    await addToCartButton.click();

    // Wait for cart to open
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'screenshots/4-cart-open.png', fullPage: true });

    // 5. Check cart has item
    const cartItem = page.locator('[data-testid="cart-item"]').first();
    await expect(cartItem).toBeVisible();

    // 6. Go to checkout
    const checkoutButton = page.locator('button:has-text("Checkout")');
    if (await checkoutButton.isVisible()) {
      await checkoutButton.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: 'screenshots/5-checkout-page.png', fullPage: true });
    }

    console.log('✅ E-commerce flow test completed successfully!');
  });
});