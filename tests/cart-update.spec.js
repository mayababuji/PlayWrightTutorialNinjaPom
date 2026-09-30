import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

import { HomePage } from '../pages/HomePage.js';
import { ProductPage } from '../pages/ProductPage.js';
import { CartPage } from '../pages/CartPage.js';

test(
  'Customer can update iPhone quantity in the cart',
  async ({ page }) => {
    // Allure labels
    await allure.epic('E-commerce');
    await allure.feature('Shopping Cart');
    await allure.story('Update product quantity');
    await allure.severity('normal');
    await allure.owner('QA Team');
    await allure.tags('regression', 'cart', 'quantity');

    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await test.step('Create cart state with two iPhones', async () => {
      await homePage.open();
      await homePage.openProduct('iPhone');
      await productPage.setQuantity(2);
      await productPage.addToCart();
      await homePage.openCart();
    });

    await test.step('Update the iPhone quantity to three', async () => {
      await cartPage.updateQuantity('iPhone', 3);
    });

    await test.step('Verify the cart update success message', async () => {
      await expect(cartPage.successAlert).toContainText(
        'Success: You have modified your shopping cart!'
      );
    });

    await test.step('Verify the iPhone quantity is three', async () => {
      await expect(
        cartPage.productRow('iPhone').locator('input[name*="quantity"]')
      ).toHaveValue('3');
    });

    await test.step('Read cart totals', async () => {
      const subtotal = await cartPage.getTotalPrice();
      const ecoTax = await cartPage.getTotalEcoTax();
      const vat = await cartPage.getTotalVat();

      console.log('Sub-Total:', subtotal);
      console.log('Eco Tax:', ecoTax);
      console.log('VAT:', vat);
    });
  }
);