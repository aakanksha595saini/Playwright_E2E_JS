import { test, expect } from "@playwright/test";

test.only("Lets shopp", async ({ page }) => {
  await page.goto("https://www.flipkart.com/");
  await expect(page).toHaveTitle(/Flipkart/);
  await page.getByRole("link", { name: "Flipkart", exact: true }).click(); //to home page
  await page.getByRole("button", { name: "✕" }).click(); //dismiss login pop-up
  const Fashion =  page.locator('span').filter({ hasText: 'Fashion' }).first();
// console.log(await page.locator('span').filter({ hasText: 'Fashion' }).first().innerText());  
    await page.getByLabel('Fashion', { exact: true }).click();
//    await page.locator('span').filter({ hasText: 'Fashion' }).first().click();  

//   await page.locator('a').filter({ hasText: 'Women Western' }).click();
  
//   await page.getByRole("link", { name: "Women's Dresses", exact: true }).click();

});