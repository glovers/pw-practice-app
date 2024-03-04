import { expect, test } from '@playwright/test';
// import exp from 'constants'

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.getByText('Forms').click();
  await page.getByText('Form Layouts').click();
});

test('Locator syntax rules', async ({ page }) => {
  //by Tag name
  await page.locator('input').first().click();

  //by Id
  await page.locator('#inputEmail1').click();

  //by Class value
  page.locator('.shape-recatangle');

  // by attribute
  page.locator('[placeholder="Email"]');

  //by Class value (full)
  page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]');

  // combine different selectors
  page.locator('input[placeholder="Email"][nbinput]');

  //Xpath (not recommended)
  page.locator('//*[@id="inputEmail1"]');

  // by partial text match
  page.locator(':text("Using")');

  //by exact text match
  page.locator(':text-is("Using the Grid"');
});

test('User facing locators', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Email' }).first().click();
  await page.getByRole('button', { name: 'Sign in' }).first().click();

  await page.getByLabel('Email').first().click();

  await page.getByPlaceholder('Jane Doe').click();

  await page.getByText('Using the Grid').click();

  await page.getByTitle('IoT Dashboard').click();

  await page.getByTestId(' ');
});

test('Locating child elements', async ({ page }) => {
  await page.locator('nb-card nb radio :text-is("Option 1")').click();

  await page
    .locator('nb-card')
    .locator('nb-radio')
    .locator('nb-card nb radio :text-is("Option 1")')
    .click();

  await page.locator('nb-card').getByRole('button', { name: 'sign in' }).first().click();

  await page.locator('nb-card').nth(3).getByRole('button').click();
});

test('locating parent elements', async ({ page }) => {
  await page
    .locator('nb-card', { hasText: 'Using the Grid' })
    .getByRole('textbox', { name: 'Email' })
    .click();
  await page
    .locator('nb-card', { has: page.locator('#inputEmail1') })
    .getByRole('textbox', { name: 'Email' })
    .click();

  await page
    .locator('nb-card')
    .filter({ hasText: 'Basic form' })
    .getByRole('textbox', { name: 'Email' })
    .click();
  await page
    .locator('nb-card')
    .filter({ has: page.locator('nb-checkbox') })
    .filter({ hasText: 'Sign in' })
    .getByRole('textbox', { name: 'Email' })
    .click();

  await page
    .locator(':text-is("Using the Grid")')
    .locator('..')
    .getByRole('textbox', { name: 'Email' })
    .click();
});

test('Reusing the locators', async ({ page }) => {
  const basicForm = page.locator('nb-card').filter({ hasText: 'Basic form' });
  const emailField = basicForm.getByRole('textbox', { name: 'Email' });

  await emailField.fill('test@test.com');
  await basicForm.getByRole('textbox', { name: 'Password' }).fill('welcome123');
  await basicForm.locator('nb-checkbox').click();
  await basicForm.getByRole('button').click();

  await expect(emailField).toHaveValue('test@test.com');
});

test('extracting values', async ({ page }) => {
  // single test value
  const basicForm = page.locator('nb-card').filter({ hasText: 'Basic form' });
  const buttonText = await basicForm.locator('button').textContent();
  expect(buttonText).toEqual('Submit');

  //all test values
  const allRadioButtonLabels = await page.locator('nb-radio').allTextContents();
  expect(allRadioButtonLabels).toContain('Option 1');

  //input value
  const emailField = basicForm.getByRole('textbox', { name: 'Email' });
  await emailField.fill('test@test.com');
  const emailValue = await emailField.inputValue();
  expect(emailValue).toEqual('test@test.com');

  const placeholderValue = await emailField.getAttribute('placeholder');
  expect(placeholderValue).toEqual('Email');
});

test('Assertions', async ({ page }) => {
  const basicFormButton = page
    .locator('nb-card')
    .filter({ hasText: 'Basic form' })
    .locator('button');
  //General assertions
  //Provide value and will confirm assertion and will not wait for anything
  const value = 5;
  expect(value).toEqual(5);

  const text = await basicFormButton.textContent();
  expect(text).toEqual('Submit');

  //locator assertions
  await expect(basicFormButton).toHaveText('Submit');

  //Soft Assertion
  // this will still proceed through steps even if  soft step has failed , it is not a good practice but can help find other validation
  await expect.soft(basicFormButton).toHaveText('Submit5');
  await basicFormButton.click();
});
