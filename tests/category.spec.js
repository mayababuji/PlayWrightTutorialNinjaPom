import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { CategoryPage } from '../pages/CategoryPage.js';

test('customer can view the Laptops and Notebooks category', async ({ page }) => {
  const homePage = new HomePage(page);
  const categoryPage = new CategoryPage(page);

  await homePage.open();
  await categoryPage.openLaptopsAndNotebooks();

  await expect(categoryPage.categoryHeading).toHaveText('Laptops & Notebooks');
  await expect(page).toHaveURL(/route=product\/category/);
});