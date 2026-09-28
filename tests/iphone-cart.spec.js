import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { ProductPage } from '../pages/ProductPage.js';

test('customer can add two iPhones to the cart', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);

  await homePage.open();
  await homePage.openProduct('iPhone');

  await productPage.setQuantity(2);
  await productPage.addToCart();

  await expect(productPage.successAlert).toContainText('Success: You have added');
  await expect(productPage.successAlert).toContainText('iPhone');
});