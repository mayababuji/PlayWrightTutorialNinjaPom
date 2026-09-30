import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

import { HomePage } from '../pages/HomePage.js';
import { ProductPage } from '../pages/ProductPage.js';
import { CheckOutPage } from '../pages/CheckOutPage.js';
import { CategoryPage } from '../pages/CategoryPage.js';

import checkoutData from '../test-data/checkout-data.json' with {
  type: 'json',
};

test(
  'Customer can register and place an order',
  async ({ page }) => {
    // Allure labels
    await allure.epic('E-commerce');
    await allure.feature('Checkout');
    await allure.story('Register and place an order');
    await allure.severity('critical');
    await allure.owner('QA Team');
    await allure.tags('regression', 'checkout', 'registration', 'order');

    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const categoryPage = new CategoryPage(page);
    const checkoutPage = new CheckOutPage(page);

    const email = `maya${Date.now()}@email.com`;

    await test.step('Add an HP LP3065 product to the cart', async () => {
      await homePage.open();

      await categoryPage.openLaptopsAndNotebooks();

      await homePage.openProduct('HP LP3065');

      await productPage.addToCart();
    });

    await test.step('Verify the product was added to the cart', async () => {
      await expect(productPage.successAlert).toContainText(
        'Success: You have added'
      );

      await expect(productPage.successAlert).toContainText('HP LP3065');
    });

    await test.step('Start checkout and select account registration', async () => {
      await homePage.openCart();

      await checkoutPage.clickOnCheckout();

      await checkoutPage.selectRegisterAccount();

      await checkoutPage.continueFromCheckoutOptions();
    });

    await test.step('Register a unique customer account', async () => {
      await checkoutPage.completeRegistration({
        ...checkoutData.customer,
        email,
      });
    });

    await test.step('Complete the shipping address step', async () => {
      await checkoutPage.continueFromShippingAddress();
    });

    await test.step('Complete the shipping method step', async () => {
      await checkoutPage.continueFromShippingMethod();
    });

    await test.step('Complete the payment method step', async () => {
      await checkoutPage.continueFromPaymentMethod();
    });

    await test.step('Confirm the order', async () => {
      await checkoutPage.confirmOrder();
    });

    await test.step('Verify the order confirmation', async () => {
      await expect(checkoutPage.confirmationMessage).toBeVisible();
    });

    await test.step('Return to the home page', async () => {
      await checkoutPage.continueToHomePage();

      await expect(homePage.homePageHeading).toBeVisible();
    });
  }
);