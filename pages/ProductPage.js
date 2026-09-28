export class ProductPage {
  constructor(page) {
    this.page = page;
    this.quantityInput = page.getByRole('textbox', { name: 'Qty' });
    this.chekooutButton = page.locator('.clearfix').filter({hasText:'Checkout'});
    this.iPhoneProductCart  = page.locator('.form-group').filter({hasText:'Add to Cart'});
    this.addToCartButton =  this.iPhoneProductCart.getByRole('button', { name: 'Add to Cart' });
    this.productSection = page.locator('#product');
    this.successAlert = page.locator('.alert.alert-success');
  }

  async setQuantity(quantity) {
    await this.quantityInput.fill(String(quantity));
  }

  async addToCart() {
    await this.addToCartButton.click();
    await this.addToCartButton.click();
  }
}