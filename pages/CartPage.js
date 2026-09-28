export class CartPage {
  constructor(page) {
    this.page = page;
    this.updateButton = page.locator('.fa-refresh');
    this.removeButton = page.locator('.fa-times-circle');
    this.successAlert = page.locator('.alert.alert-success');
    this.errorAlert = page.locator('.alert-danger');
    this.checkoutLink = page.getByRole('link', { name: 'Checkout' });
    this.totalTable = page.locator('tr').filter({hasText:'Sub-Total:'});
    this.totalPrice = this.totalTable.locator('td').nth(1);
    this.ecoTaxTable = page.locator('tr').filter({hasText:'Eco Tax'});
    this.ecoTax = this.ecoTaxTable.locator('td').nth(1);
     this.vatTable = page.locator('tr').filter({hasText:'VAT'});
    this.vat = this.vatTable.locator('td').nth(1);

  }

  productRow(productName) {
    return this.page.locator('tr').filter({ hasText: productName });
  }

  async updateQuantity(productName, quantity) {
    const row = this.productRow(productName);

    await row.locator('input[name*="quantity"]').fill(String(quantity));
    await this.updateButton.click();
  }

  totalRow(label) {
    return this.page.locator('tr').filter({ hasText: label });
  }

  async getTotal(label) {
    return await this.totalRow(label).locator('td').nth(1).innerText();
  }

  async removeFirstProduct() {
    await this.removeButton.first().click();
  }

  async applyCoupon(couponCode) {
    await this.page.getByRole('link', { name: 'Use Coupon Code' }).click();
    await this.page
      .getByRole('textbox', { name: 'Enter your coupon here' })
      .fill(couponCode);

    await this.page.locator('#button-coupon').click();
  }

  async applyGiftCertificate(giftCode) {
    await this.page.getByRole('link', { name: 'Use Gift Certificate' }).click();
    await this.page
      .getByRole('textbox', { name: 'Enter your gift certificate code here' })
      .fill(giftCode);

    await this.page.locator('#button-voucher').click();
  }

  async checkout() {
    await this.checkoutLink.click();
  }

  async getTotalPrice(){
    return await this.totalPrice.innerText() ;
  }
  async getTotalEcoTax(){
    return await this.ecoTax.innerText() ;
  }
  async getTotalVat(){
    return await this.vat.innerText() ;
  }
}