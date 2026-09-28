export class CheckOutPage {
  constructor(page) {
    this.page = page;

    // Cart page
    this.checkoutLink = page.getByRole('link', {
      name: 'Checkout',
      exact: true
    });

    // Checkout options section
    this.registerAccountRadio = page.getByRole('radio', {
      name: 'Register Account',
      exact: true
    });

    this.continueCheckoutOptionsButton = page.locator('#button-account');

    // Registration section
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
    this.emailInput = page.getByRole('textbox', { name: '* E-Mail' });
    this.addressInput = page.getByRole('textbox', { name: 'Address 1' });
    this.telephoneInput = page.getByRole('textbox', { name: 'Telephone' });
    this.cityInput = page.getByRole('textbox', { name: 'City' });
    this.postalCodeInput = page.getByRole('textbox', { name: 'Post Code' });

    this.passwordInput = page.getByRole('textbox', {
      name: '* Password',
      exact: true
    });

    this.confirmPasswordInput = page.getByRole('textbox', {
      name: '* Password Confirm',
      exact: true
    });

    this.countryDropdown = page.locator('#input-payment-country');
    this.zoneDropdown = page.locator('#input-payment-zone');

    this.agreeCheckbox = page.locator('input[name="agree"]');
    this.continueRegistrationButton = page.locator('#button-register');

    // Shipping and payment sections
    this.continueShippingAddressButton = page.locator(
      '#button-shipping-address'
    );

    this.continueShippingMethodButton = page.locator(
      '#button-shipping-method'
    );

    this.continuePaymentMethodButton = page.locator(
      '#button-payment-method'
    );

    this.confirmOrderButton = page.locator('#button-confirm');

    // Confirmation page
    this.confirmationMessage = page.getByText(
      'Your order has been placed!',
      { exact: true }
    );

    this.continueHomePageLink = page.getByRole('link', {
      name: 'Continue',
      exact: true
    });
  }

  async clickOnCheckout() {
    await this.checkoutLink.click();
  }

  async selectRegisterAccount() {
    await this.registerAccountRadio.check();
  }

  async continueFromCheckoutOptions() {
    await this.continueCheckoutOptionsButton.click();
  }

  async enterFirstName(firstName) {
    await this.firstNameInput.fill(firstName);
  }

  async enterLastName(lastName) {
    await this.lastNameInput.fill(lastName);
  }

  async enterEmail(email) {
    await this.emailInput.fill(email);
  }

  async enterAddress(address) {
    await this.addressInput.fill(address);
  }

  async enterTelephone(telephone) {
    await this.telephoneInput.fill(telephone);
  }

  async enterCity(city) {
    await this.cityInput.fill(city);
  }

  async enterPostalCode(postalCode) {
    await this.postalCodeInput.fill(postalCode);
  }

  async enterPassword(password) {
    await this.passwordInput.fill(password);
  }

  async enterConfirmPassword(password) {
    await this.confirmPasswordInput.fill(password);
  }

  async selectCountry(country) {
    await this.countryDropdown.selectOption({ label: country });
  }

  async selectZone(zone) {
    await this.zoneDropdown.selectOption({ label: zone });
  }

  async agreeToPrivacyPolicy() {
    await this.agreeCheckbox.check();
  }

  async continueFromRegistration() {
    await this.continueRegistrationButton.click();
  }

  async completeRegistration({
    firstName,
    lastName,
    email,
    address,
    telephone,
    city,
    postalCode,
    country,
    zone,
    password
  }) {
    await this.enterFirstName(firstName);
    await this.enterLastName(lastName);
    await this.enterEmail(email);
    await this.enterAddress(address);
    await this.enterTelephone(telephone);
    await this.enterCity(city);
    await this.enterPostalCode(postalCode);
    await this.enterPassword(password);
    await this.enterConfirmPassword(password);

    await this.selectCountry(country);
    await this.selectZone(zone);

    await this.agreeToPrivacyPolicy();
    await this.continueFromRegistration();
  }

  async continueFromShippingAddress() {
    await this.continueShippingAddressButton.click();
  }

  async continueFromShippingMethod() {
    await this.continueShippingMethodButton.click();
  }

  async continueFromPaymentMethod() {
     await this.agreeToPrivacyPolicy();
    await this.continuePaymentMethodButton.click();
  }

  async confirmOrder() {
    await this.confirmOrderButton.click();
  }

  async continueToHomePage() {
    await this.continueHomePageLink.click();
  }
}