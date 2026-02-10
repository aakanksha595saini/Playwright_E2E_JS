// @ts-check
import { test, expect } from '@playwright/test';

test.only('has title', async ({ page }) => {
  await page.goto('https://automationexercise.com/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Automation/);
  console.log(await page.title());
  // console.log(await expect(page).toHaveTitle(/Automation/));
  await page.getByRole('button', { name: 'Test Cases' }).click();
});
