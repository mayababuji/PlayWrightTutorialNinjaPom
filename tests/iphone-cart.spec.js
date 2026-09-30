import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

import { HomePage } from '../pages/HomePage.js';
import { ProductPage } from '../pages/ProductPage.js';

test(
  'Customer can add two iPhones to the cart',
  async ({ page }) => {
    // Allure labels
    await allure.epic('E-commerce');
    await allure.feature('Shopping Cart');
    await allure.story('Add multiple product quantities');
    await allure.severity('normal');
    await allure.owner('QA Team');
    await allure.tags('smoke', 'cart', 'quantity');

    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    await test.step('Open the TutorialsNinja home page', async () => {
      await homePage.open();
    });

    await test.step('Open the iPhone product page', async () => {
      await homePage.openProduct('iPhone');
    });

    await test.step('Set the iPhone quantity to two', async () => {
      await productPage.setQuantity(2);
    });

    await test.step('Add two iPhones to the cart', async () => {
      await productPage.addToCart();
    });

    await test.step('Verify the product was added successfully', async () => {
      await expect(productPage.successAlert).toContainText(
        'Success: You have added'
      );

      await expect(productPage.successAlert).toContainText('iPhone');
    });
  }
);