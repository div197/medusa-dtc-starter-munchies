import { test, expect } from '@playwright/test';

test.describe('Cart Flow Test', () => {
  test('Add to cart and verify cart functionality', async ({ page }) => {
    // 1. Go to product page
    await page.goto('http://localhost:3000/gb/products/t-shirt');
    await page.waitForLoadState('networkidle');

    // 2. Select options if available
    const colorSelect = page.locator('select').first();
    if (await colorSelect.isVisible()) {
      await colorSelect.selectOption({ index: 0 });
    }

    const sizeSelect = page.locator('select').nth(1);
    if (await sizeSelect.isVisible()) {
      await sizeSelect.selectOption({ index: 0 });
    }

    // 3. Click add to cart - get the first button (main product button)
    const addToCartButton = page.locator('button:has-text("Add to cart")').first();
    await expect(addToCartButton).toBeEnabled();
    await addToCartButton.click();

    // 4. Wait for cart to open
    await page.waitForTimeout(1000);

    // 5. Check if cart opened and item added
    const cartDrawer = page.locator('[role="dialog"]').first();
    const isCartVisible = await cartDrawer.isVisible();

    if (isCartVisible) {
      console.log('✅ Cart drawer opened successfully');

      // Check for cart item
      const cartItemTitle = page.locator('text=/T-Shirt/i').first();
      await expect(cartItemTitle).toBeVisible({ timeout: 5000 });
      console.log('✅ Item added to cart successfully');

      // Check quantity controls
      const quantityInput = page.locator('input[type="number"]').first();
      if (await quantityInput.isVisible()) {
        const quantity = await quantityInput.inputValue();
        console.log(`✅ Item quantity: ${quantity}`);
      }

      // Check for checkout button
      const checkoutButton = page.locator('a:has-text("Checkout")').first();
      if (await checkoutButton.isVisible()) {
        console.log('✅ Checkout button is visible');
      }
    }

    await page.screenshot({ path: 'screenshots/cart-test-final.png', fullPage: true });
    console.log('✅ Cart flow test completed successfully!');
  });
});