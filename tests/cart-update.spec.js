import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { ProductPage } from '../pages/ProductPage.js';
import { CartPage } from '../pages/CartPage.js';

test('customer can update iPhone quantity in the cart', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);

  // Test-specific setup: creates its own cart state.
  await homePage.open();
  await homePage.openProduct('iPhone');
  await productPage.setQuantity(2);
  await productPage.addToCart();
  await homePage.openCart();

  // Behavior being tested.
  await cartPage.updateQuantity('iPhone', 3);

  await expect(cartPage.successAlert).toContainText(
    'Success: You have modified your shopping cart!'
  );

  await expect(cartPage.productRow('iPhone').locator('input[name*="quantity"]'))
    .toHaveValue('3');

    const subtotal = await cartPage.getTotalPrice();

console.log('Sub-Total:', subtotal);
const ecoTax = await cartPage.getTotalEcoTax();
console.log('Eco Tax is: ',ecoTax)
const vat = await cartPage.getTotalVat();
console.log('VAT is: ',vat)
    
});