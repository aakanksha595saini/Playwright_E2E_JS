
// @ts-check
import { test, expect } from '@playwright/test';


// import AxeBuilder from '@axe-core/playwright'; //Accessibility testing framework


test.only('Youtube', async ({ page }) => {
 await page.goto('https://www.youtube.com/');
//  Expect a title "to contain" a substring.
 await expect(page).toHaveURL(/.*youtube.com/);
 await expect(page).toHaveTitle(/YouTube/);
 await page.locator('input[name="search_query"]').fill('playwright with AI');
 await page.locator('input[name="search_query"]').press('Enter')
 console.log('URL: ' + page.url());

 await page.getByText('Playwright MCP - How to use AI for Manual Testing', { exact: true }).click();
 // const codemifyLink =  page.locator("//div[@id='upload-info']//a[@class='yt-simple-endpoint style-scope yt-formatted-string'][normalize-space()='Codemify']").filter({ hasText: 'Codemify' });
 const codemifyLink =  page.locator("//div[@id='upload-info']//a[@class='yt-simple-endpoint style-scope yt-formatted-string'][normalize-space()='Codemify']").filter({ hasText: 'Codemify' }).first();
 // await expect.any(codemifyLink).toBeVisible();
 console.log(await expect(codemifyLink).toContainText('Codemify'));
 if( page.getByRole('button', { name: 'skip' ,exact:true})) 
  {
   //  await page.locator('video');
 await page.getByRole('button', { name: 'Skip', exact: true }).click();
 // await page.locator('video').waitFor();


 await page.locator('video').first().click();
 // const accessibilityScanResults = await new AxeBuilder({ page }).include("video").analyze(); // 4
  //  const accessibilityScanResults = await new AxeBuilder({ page }).withTags(['wcag22aa','wcag2a',
  //      'wcag2aa','wcag2aaa','wcag21a','wcag21aa','wcag21aaa','best-practice']).analyze();
  //      console.log(accessibilityScanResults);
 } 
 else
   {
   await codemifyLink.click();
    }


 await page.pause();
});
