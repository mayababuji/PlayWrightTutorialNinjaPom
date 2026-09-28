import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { ProductPage } from '../pages/ProductPage.js';
import { CheckOutPage } from '../pages/CheckOutPage.js';
import { CategoryPage } from '../pages/CategoryPage.js';
import checkoutData from '../test-data/checkout-data.json' with { type: 'json' };

test('customer can register and place an order', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const categoryPage = new CategoryPage(page);
  const checkoutPage = new CheckOutPage(page);

  const email = `maya${Date.now()}@email.com`;

  // Add a product to the cart.
  await homePage.open();

  await categoryPage.openLaptopsAndNotebooks();

  await homePage.openProduct('HP LP3065');

  await productPage.addToCart();

  await expect(productPage.successAlert).toContainText(
    'Success: You have added'
  );

  await expect(productPage.successAlert).toContainText('HP LP3065');

  // Begin checkout and choose registration.
  await homePage.openCart();

  await checkoutPage.clickOnCheckout();

  await checkoutPage.selectRegisterAccount();

  await checkoutPage.continueFromCheckoutOptions();

  // Register a unique account.
 await checkoutPage.completeRegistration({
  ...checkoutData.customer,
  email
});

  // Complete checkout.
  await checkoutPage.continueFromShippingAddress();

  await checkoutPage.continueFromShippingMethod();

  await checkoutPage.continueFromPaymentMethod();

  await checkoutPage.confirmOrder();

  // Verify successful order.
  await expect(checkoutPage.confirmationMessage).toBeVisible();

  await checkoutPage.continueToHomePage();

  await expect(homePage.homePageHeading).toBeVisible();
});