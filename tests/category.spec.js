import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

import { HomePage } from '../pages/HomePage.js';
import { CategoryPage } from '../pages/CategoryPage.js';

test(
  'Customer can view the Laptops and Notebooks category',
  async ({ page }) => {
    // Allure labels
    await allure.epic('E-commerce');
    await allure.feature('Product Categories');
    await allure.story('View Laptops and Notebooks category');
    await allure.severity('normal');
    await allure.owner('QA Team');
    await allure.tags('regression', 'category', 'navigation');

    const homePage = new HomePage(page);
    const categoryPage = new CategoryPage(page);

    await test.step('Open the TutorialsNinja home page', async () => {
      await homePage.open();
    });

    await test.step('Open the Laptops and Notebooks category', async () => {
      await categoryPage.openLaptopsAndNotebooks();
    });

    await test.step('Verify the category heading', async () => {
      await expect(categoryPage.categoryHeading).toHaveText(
        'Laptops & Notebooks'
      );
    });

    await test.step('Verify the category URL', async () => {
      await expect(page).toHaveURL(/route=product\/category/);
    });
  }
);