import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('navigate to form page', async ({ page }) => {
  const pm = new PageManager(page);

  await pm.navigateTo().formLayoutsPage();
  await pm.navigateTo().datePickerPage();
  await pm.navigateTo().smartTablePage();
  await pm.navigateTo().toastrPage();
  await pm.navigateTo().toolTipPage();
});

test('parametrised methods', async ({ page }) => {
  const pm = new PageManager(page);
  const randomFullName = faker.person.fullName();
  //This can be changed to ensure only first name , gender can be preset or fulfilled
  const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`;
  //This allows the email address to use the full name and the int value if nothing was in it would use a massive int but is now set to only from 0 to 1000
  //We did need to use .replace(' ', '') to remove the space between first name and last name
  await pm.navigateTo().formLayoutsPage();
  await pm
    .onFormLayoutsPage()
    .submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 2');
  await page.screenshot({ path: 'screenshots/formlayouts.png' });
  await pm
    .onFormLayoutsPage()
    // .submitInlineFormWithNameEmailandCheckbox('John Smith', 'John@test.com', false); // this was to replace
    .submitInlineFormWithNameEmailandCheckbox(randomFullName, randomEmail, false);
  // await pm.navigateTo().datePickerPage();
  // // await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(10);
  // await pm.onDatePickerPage().selectDatePickerWithRangeFromToday(3, 7);
});
