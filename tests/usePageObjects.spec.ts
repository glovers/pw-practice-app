import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/');
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
  await pm.navigateTo().formLayoutsPage();
  await pm
    .onFormLayoutsPage()
    .submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 2');
  await pm
    .onFormLayoutsPage()
    .submitInlineFormWithNameEmailandCheckbox('John Smith', 'John@test.com', false);
  await pm.navigateTo().datePickerPage();
  // await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(10);
  await pm.onDatePickerPage().selectDatePickerWithRangeFromToday(3, 7);
});
