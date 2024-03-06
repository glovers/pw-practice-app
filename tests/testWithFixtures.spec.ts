import { test } from '../test options/test-options';
// import { PageManager } from '../page-objects/pageManager';
import { faker } from '@faker-js/faker';

// test.beforeEach(async ({ page }) => {
//   await page.goto('/');
// });

test('parametrised methods', async ({ pageManager, formLayoutsPage }) => {
  const randomFullName = faker.person.fullName();
  //This can be changed to ensure only first name , gender can be preset or fulfilled
  const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`;
  //This allows the email address to use the full name and the int value if nothing was in it would use a massive int but is now set to only from 0 to 1000
  //We did need to use .replace(' ', '') to remove the space between first name and last name
  // await pm.navigateTo().formLayoutsPage(); -- Not required due to using test-options / fixtures for formLayoutsPage
  await pageManager
    .onFormLayoutsPage()
    .submitUsingTheGridFormWithCredentialsAndSelectOption(
      process.env.USERNAME,
      process.env.PASSWORD,
      'Option 2',
    );
  // await page.screenshot({ path: 'screenshots/formlayouts.png' });
  await pageManager
    .onFormLayoutsPage()
    // .submitInlineFormWithNameEmailandCheckbox('John Smith', 'John@test.com', false); // this was to replace
    .submitInlineFormWithNameEmailandCheckbox(randomFullName, randomEmail, false);
});
