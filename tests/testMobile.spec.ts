import { test, expect } from '@playwright/test';

test('input fields', async ({ page }) => {
  await page.goto('/');
  await page.locator('.sidebar-toggle').click();
  await page.getByText('Forms').click();
  await page.getByText('Form Layouts').click();
  await page.locator('.sidebar-toggle').click();
  const usingTheGridEmailInput = page
    .locator('nb-card', { hasText: 'Using the Grid' })
    .getByRole('textbox', { name: 'Email' });

  await usingTheGridEmailInput.fill('test@test.com');
  await usingTheGridEmailInput.clear();
  await usingTheGridEmailInput.pressSequentially('test2@test.com');
});
