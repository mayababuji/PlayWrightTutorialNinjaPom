import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { ProductPage } from '../pages/ProductPage.js';

test('Canon shows an error when required options are missing', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);

  await homePage.open();
  await homePage.openProduct('Canon EOS 5D');
  await productPage.addToCart();

  await expect(productPage.productSection).toContainText('Select required!');
});