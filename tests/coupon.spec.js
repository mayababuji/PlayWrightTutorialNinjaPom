import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { ProductPage } from '../pages/ProductPage.js';
import { CartPage } from '../pages/CartPage.js';

test('customer sees an error for an invalid coupon code', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);

  // Setup: each test creates its own cart state.
  await homePage.open();
  await homePage.openProduct('iPhone');

  await productPage.addToCart();

  await expect(productPage.successAlert).toContainText('Success: You have added');
  await expect(productPage.successAlert).toContainText('iPhone');

  await homePage.openCart();

  // Action and verification.
  await cartPage.applyCoupon('ABCD123');

  await expect(cartPage.errorAlert).toBeVisible();
  await expect(cartPage.errorAlert).toContainText('Warning: Coupon is either invalid');
  await cartPage.applyGiftCertificate('AXDFGH123');
   await expect(cartPage.errorAlert).toBeVisible();
    await expect(cartPage.errorAlert).toContainText('Warning: Gift Certificate is either invalid');

    //clear the text box
     await cartPage.applyCoupon('');
       await cartPage.applyGiftCertificate('');

});