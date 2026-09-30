import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

import { HomePage } from '../pages/HomePage.js';
import { ProductPage } from '../pages/ProductPage.js';

test(
  'Canon shows an error when required options are missing',
  async ({ page }) => {
    // Allure labels
    await allure.epic('E-commerce');
    await allure.feature('Product Details');
    await allure.story('Required Product Options');
    await allure.severity('normal');
    await allure.owner('QA Team');
    await allure.tags('regression', 'product', 'validation');

    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    // Readable test steps
    await test.step('Open the TutorialsNinja home page', async () => {
      await homePage.open();
    });

    await test.step('Open the Canon EOS 5D product', async () => {
      await homePage.openProduct('Canon EOS 5D');
    });

    await test.step(
      'Add the product without selecting required options',
      async () => {
        await productPage.addToCart();
      }
    );

    await test.step('Verify the required-options error message', async () => {
      await expect(productPage.productSection).toContainText(
        'Select required!'
      );
    });
  }
);