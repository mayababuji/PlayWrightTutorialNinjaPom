export class CategoryPage {
  constructor(page) {
    this.page = page;
    this.categoryHeading = page.locator('#product-category #content h2');
  }

  async openLaptopsAndNotebooks() {
    await this.page.getByRole('link', { name: 'Laptops & Notebooks' }).click();
    await this.page
      .getByRole('link', { name: 'Show AllLaptops & Notebooks' })
      .click();
  }

  productCard(productName) {
    return this.page.locator('.product-thumb').filter({ hasText: productName });
  }

  async openProduct(productName) {
    await this.productCard(productName)
      .getByRole('link', { name: productName })
      .click();
  }
}