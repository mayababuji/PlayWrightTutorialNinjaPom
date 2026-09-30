import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

import { HomePage } from '../pages/HomePage.js';
import { ProductPage } from '../pages/ProductPage.js';
import { CartPage } from '../pages/CartPage.js';

test(
  'Customer sees errors for invalid coupon and gift certificate codes',
  async ({ page }) => {
    // Allure labels
    await allure.epic('E-commerce');
    await allure.feature('Shopping Cart');
    await allure.story('Invalid discount codes');
    await allure.severity('normal');
    await allure.owner('QA Team');
    await allure.tags(
      'regression',
      'cart',
      'coupon',
      'gift-certificate',
      'validation'
    );

    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await test.step('Add an iPhone to the cart', async () => {
      await homePage.open();
      await homePage.openProduct('iPhone');
      await productPage.addToCart();
    });

    await test.step('Verify the iPhone was added successfully', async () => {
      await expect(productPage.successAlert).toContainText(
        'Success: You have added'
      );

      await expect(productPage.successAlert).toContainText('iPhone');
    });

    await test.step('Open the shopping cart', async () => {
      await homePage.openCart();
    });

    await test.step('Apply an invalid coupon code', async () => {
      await cartPage.applyCoupon('ABCD123');
    });

    await test.step('Verify the invalid coupon warning', async () => {
      await expect(cartPage.errorAlert).toBeVisible();

      await expect(cartPage.errorAlert).toContainText(
        'Warning: Coupon is either invalid'
      );
    });

    await test.step('Apply an invalid gift certificate code', async () => {
      await cartPage.applyGiftCertificate('AXDFGH123');
    });

    await test.step('Verify the invalid gift certificate warning', async () => {
      await expect(cartPage.errorAlert).toBeVisible();

      await expect(cartPage.errorAlert).toContainText(
        'Warning: Gift Certificate is either invalid'
      );
    });

    await test.step('Clear coupon and gift certificate inputs', async () => {
      await cartPage.applyCoupon('');
      await cartPage.applyGiftCertificate('');
    });
  }
);