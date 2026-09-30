import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

import { HomePage } from '../pages/HomePage.js';

test(
  'Customer can change currency to Euro',
  async ({ page }) => {
    // Allure labels
    await allure.epic('E-commerce');
    await allure.feature('Currency');
    await allure.story('Change currency to Euro');
    await allure.severity('normal');
    await allure.owner('QA Team');
    await allure.tags('regression', 'currency', 'localization');

    const homePage = new HomePage(page);

    await test.step('Open the TutorialsNinja home page', async () => {
      await homePage.open();
    });

    await test.step('Change the currency to Euro', async () => {
      await homePage.selectEuro();
    });

    await test.step('Verify that prices are displayed in Euros', async () => {
      await expect(page.getByRole('strong')).toContainText('€');
    });
  }
);