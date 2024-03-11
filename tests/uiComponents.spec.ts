import { test, expect } from '@playwright/test';
import { delay } from 'rxjs-compat/operator/delay';

test.describe.configure({ mode: 'parallel' });

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Form Layouts page @regression', () => {
  test.describe.configure({ retries: 0 });
  test.beforeEach(async ({ page }) => {
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
  });

  test('input fields', async ({ page }) => {
    const usingTheGridEmailInput = page
      .locator('.nb-card', { hasText: 'Using the Grid' })
      .getByRole('textbox', { name: 'Email' });

    await usingTheGridEmailInput.fill('test@test.com');
    await usingTheGridEmailInput.clear();
    await usingTheGridEmailInput.pressSequentially('test2@test.com', { delay: 500 });

    //generic assertion
    const inputValue = await usingTheGridEmailInput.inputValue();
    expect(inputValue).toEqual('test2@test.com');

    //locator assertion
    await expect(usingTheGridEmailInput).toHaveValue('test2@test.com');
    // await expect(usingTheGridEmailInput).toHaveValue('test2@test.com1');
  });

  test.only('radio buttons', async ({ page }) => {
    const usingTheGridForm = page.locator('nb-card', { hasText: 'Using the Grid' });
    // due to the option 1 being "visually hidden" we need to use force:true to select it
    await usingTheGridForm.getByLabel('Option 1').check({ force: true });
    // this below is similar to the above
    await usingTheGridForm.getByRole('radio', { name: 'Option 1' }).check({ force: true });

    const radioStatus = usingTheGridForm.getByRole('radio', { name: 'Option 1' }).isChecked();
    await expect(usingTheGridForm).toHaveScreenshot();
    // expect(radioStatus).toBeTruthy();
    // await expect(usingTheGridForm.getByRole('radio', { name: 'Option 1' })).toBeChecked();

    // await usingTheGridForm.getByLabel('Option 2').check({ force: true });
    // expect(await usingTheGridForm.getByRole('radio', { name: 'Option 1' }).isChecked()).toBeFalsy();
    // expect(
    //   await usingTheGridForm.getByRole('radio', { name: 'Option 2' }).isChecked(),
    // ).toBeTruthy();
  });

  // other tests...

  test('tooltips', async ({ page }) => {
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Tooltip').click();

    const toolTipCard = page.locator('nb-card', { hasText: 'Tooltip Placements' });
    await toolTipCard.getByRole('button', { name: 'Top' }).hover();

    page.getByRole('tooltip'); // if you have a role tooltip created
    const tooltip = await page.locator('nb-tooltip').textContent();
    expect(tooltip).toEqual('This is a tooltip');
  });

  // other tests...
});

test('Web tables Part1', async ({ page }) => {
  await page.getByText('Tables & Data').click();
  await page.getByText('Smart Table').click();

  //1 get the row by any text in this row
  const targetRow = page.getByRole('row', { name: 'twitter@outlook.com' });
  await targetRow.locator('nb-edit').click();
  await page.locator('input-editor').getByPlaceholder('Age').clear();
  await page.locator('input-editor').getByPlaceholder('Age').fill('35');
  await page.locator('.nb-checkmark').click();

  //2  get the row based on the value in the specific column
  await page.locator('.ng2-smart-pagination-nav').getByText('2').click();
  const targetRowByID = page
    .getByRole('row', { name: '11' })
    .filter({ has: page.locator('td').nth(1).getByText('11') });
  await targetRowByID.click();
  await page.locator('input-editor').getByPlaceholder('Email').clear();
  await page.locator('input-editor').getByPlaceholder('Email').fill('test@test.com');
  await page.locator('.nb-checkmark').click();
  await expect(targetRowByID.locator('td')).toHaveText('test@test.com');

  //3 test filter of the table
  const ages = ['20', '30', '40', '200'];

  for (let age of ages) {
    await page.locator('input-filter').getByPlaceholder('Age').clear();
    await page.locator('input-filter').getByPlaceholder('Age').fill(age);
    const ageRows = page.locator('tbody tr');
    for (let row of await ageRows.all()) {
      const cellValue = await row.locator('td').last().textContent();
      if (age != '200') {
        expect(await page.getByRole('table').textContent()).toContain('No data found');
      } else {
        expect(cellValue).toEqual(age);
      }
    }
  }
});

test('date pickers', async ({ page }) => {
  await page.getByText('Forms').click();
  await page.getByText('Datepicker').click();

  const calendarInputField = page.getByPlaceholder('Form Picker');
  await calendarInputField.click();

  let date = new Date();
  date.setDate(date.getDate() + 200);
  const expectedDate = date.getDate().toString();
  const expectedMonthShort = date.toLocaleString('En-US', { month: 'short' });
  const expectedMonthLong = date.toLocaleString('En-US', { month: 'long' });
  const expectedYear = date.getFullYear();
  const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;

  let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent();
  const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear}`;
  while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {
    await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click();
    calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent();
  }

  await page
    .locator('[class="day-cell ng-star-inserted"]')
    .getByText(expectedDate, { exact: true })
    .click();
  // await expect(calendarInputField).toHaveValue('Jun  1, 2023');
  await expect(calendarInputField).toHaveValue(dateToAssert);
});

test('sliders', async ({ page }) => {
  // Update attribute

  // const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle');
  // await tempGauge.evaluate(node => {
  //   node.setAttribute('cx', '232.630');
  //   node.setAttribute('cy', '232.630');
  // });

  // await tempGauge.click();

  //Mouse movement
  const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger');
  await tempBox.scrollIntoViewIfNeeded();

  const box = await tempBox.boundingBox();
  const x = box.x + box.width / 2; // this will put in centre
  const y = box.y + box.height / 2; // this will put in centre
  await page.mouse.move(x, y); // this allows you to move both x and y
  await page.mouse.down(); // This will hold left click mouse down
  await page.mouse.move(x + 100, y); // this will move mouse to the right
  await page.mouse.move(x + 100, y + 100); //This will move mouse further
  await page.mouse.up(); //  This will release left click on mouse
  await expect(tempBox).toContainText('30');
});
