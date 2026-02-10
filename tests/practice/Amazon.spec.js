import { test, expect } from "@playwright/test";
import {chromium, devices} from "playwright";
// const { chromium, devices } = require('playwright');

// test('Amazon home page', async()=>
// {
//   const browser = await chromium.launch();
//   const context = await browser.newContext();
//   const page = await context.newPage();

//     await page.goto('https://www.amazon.in/ref=nav_logo');
//     await expect(page).toHaveTitle(/Amazon.in/);
//     await page.getByRole('link', {name:'MX Player'}).click();
//     await expect(page.getByRole('heading', { name: 'Trending Top 10' })).toBeVisible();
//     // console.log(await page.getByRole('heading', { name: 'Trending Top 10' }).innerText());
//     await page.locator("(//img[@alt='Move carousel right'])[1]").click();
//     await page.goBack();
    // await page.locator(".hm-icon.nav-sprite").click();
    // await page.getByRole('button', { name: 'Women\'s Fashion' }).click();
    // await page.getByRole('link', { name: 'Clothing' }).filter({exact:'Clothing'}).click();
    // await page.locator('.sl-sobe-carousel-sub-card-link').first().click();
    // await page.getByText('Bewakoof').first().click();
    // const page1Promise = page.waitForEvent('popup');
    // await page.getByRole('link', { name: 'X Official Garfield' }).click();
    // const page1 = await page1Promise;
    // await page1.getByRole('button', { name: 'Bewakoof X Official Garfield' }).click();
    // await page1.getByLabel('Share').click();
    // await page1.getByRole('button', { name: 'Close Share Popup' }).click();
    // await page1.locator('#a-autoid-5').getByLabel('', { exact: true }).click();
    // await page1.locator('#a-autoid-6').getByRole('radio').click();
    // await page1.getByRole('radio', { name: 'XS ₹569.00 with 58 percent' }).click();
    // await page1.getByRole('button', { name: 'Add to cart', exact: true }).click();

    //   await page.pause();

// });
test.only('test', async () => {
  //Browser Launch
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
//Test Steps
  await page.goto('https://www.amazon.in/ref=nav_logo');
  await expect(page).toHaveTitle(/Amazon.in/);
  await page.getByRole('link', { name: 'MX Player' }).click();
  await page.goBack();
  // await page.getByRole('link', { name: 'Mobiles' }).click({modifiers: ['Control']});
//Right click on the Tab Mobiles and open in new tab
const mobile_link = page.getByRole('link', { name: 'Mobiles' });
const [newPage] = await Promise.all([ //newpage is array so that you can store multiple pages if needed
  context.waitForEvent('page'),mobile_link.click({ modifiers: ['Control'] })
  //Opening the mobile link in new tab using control key,
]);
// or use 'Meta' instead of 'Control' on Mac
// mobile_link.click({ modifiers: ['Meta'] }),
await newPage.waitForLoadState('domcontentloaded');
await newPage.bringToFront();// Peak into new tab actions
console.log('New tab URL:', newPage.url()); // get the URL of the new tab
console.log('New tab title:', await newPage.title());
// Optional: Bring the new tab to the front
  await newPage.getByRole('link', { name: 'Note' }).click();
  await newPage.getByRole('link', { name: 'Bestsellers' }).click();
  await newPage.getByRole('searchbox', { name: 'Search Amazon.in' }).click();
  await newPage.getByRole('searchbox', { name: 'Search Amazon.in' }).fill('iphone 15');
  await newPage.getByRole('searchbox', { name: 'Search Amazon.in' }).press('Enter');
  await newPage.getByRole('button', { name: 'Go', exact: true }).click();
  //Select all products
  const allproducts = newPage.locator("//div[@class='puisg-col-inner']");
  await allproducts.last().waitFor();//wait for the products to be visible
  const count = await allproducts.count();
  console.log('Total products found:', count);
  //Select product one by one
  const productName = '/iPhone 16e 128 GB/';
//retrieve product names and print

  for (let i = 0; i < count; ++i) 
    {
      const product = await allproducts.nth(i).locator('h2').textContent(); //      //check for specific product
      //print all product names
      console.log( product);
      //click on the product name'iPhone 16e 128 GB: Built for Apple Intelligence, A18 Chip, Supersized Battery Life, 48MP Fusion. Camera, 15.40 cm (6.1″) Super Retina XDR Display; Black']
    // if (productName === product)
    // if(product && product.match(productName))
    //    {
    //   console.log("Product found:", productName);
    //   await allproducts.nth(i).locator("text =Add to cart").click();  
    //   break; // Exit the loop once the product is found and clicked

    // }
  } 

  // await newPage.locator('div').filter({ hasText: /^Add to cart$/ }).nth(1).click();
  // await newPage.locator('#a-autoid-1-announce').click(); //clicking on first iphone 15
  // await newPage.getByRole('link', { name: 'Go to Cart' }).click();
  // await newPage.getByRole('button', { name: 'Proceed to Buy Buy Amazon' }).click();
  // await newPage.getByRole('textbox', { name: 'Enter mobile number or email' }).fill('8267870985');
  // // await newPage.getByRole('textbox', { name: 'Enter mobile number or email' }).press('Enter');
  // await newPage.getByRole('button', { name: 'Continue' }).click();
  // await newPage.goto('https://www.amazon.in/checkout/p/p-404-6272662-0755527/pay?pipelineType=Chewbacca&referrer=pay');
  // newPage.pause();

});

