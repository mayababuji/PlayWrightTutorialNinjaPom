import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';

test('customer can change currency to Euro', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.open();
  await homePage.selectEuro();

  await expect(page.getByRole('strong')).toContainText('€');
});