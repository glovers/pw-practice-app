import { Locator, Page, expect } from '@playwright/test';
import { HelperBase } from './helperBase';

export class formLayoutsPage extends HelperBase {
  constructor(page: Page) {
    super(page);
  }
  /**
   *
   * @param email  - Email Address
   * @param password  - Password
   * @param optionText  - 'Option 1' or 'Option 2'
   */
  async submitUsingTheGridFormWithCredentialsAndSelectOption(
    email: string,
    password: string,
    optionText: string,
  ) {
    const usingTheGridForm = this.page.locator('nb-card', { hasText: 'Using the Grid' });
    await usingTheGridForm.getByRole('textbox', { name: 'Email' }).fill(email);
    await usingTheGridForm.getByRole('textbox', { name: 'Password' }).fill(password);
    await usingTheGridForm.getByRole('radio', { name: optionText }).check({ force: true });
    await usingTheGridForm.getByRole('button').click();
  }
  /**
   * This method will fill the Inline Form with user details
   * @param name  - should be first and last name
   * @param email  - valid email for the test user
   * @param rememberMe  - true or false if user session to be saved
   */

  async submitInlineFormWithNameEmailandCheckbox(name: string, email: string, rememberMe: boolean) {
    const InlineForm = this.page.locator('nb-card', { hasText: 'Inline form' });
    await InlineForm.getByRole('textbox', { name: 'Jane Doe' }).fill(name);
    await InlineForm.getByRole('textbox', { name: 'Email' }).fill(email);
    if (rememberMe) await InlineForm.getByRole('checkbox').check({ force: true });
    await InlineForm.getByRole('button').click();
  }
}
