//@ts-check semantic checks in JS
import { test, expect } from "@playwright/test";
import { log } from "node:console";
import { chromium } from "playwright";
test('Automate first',async ({page}) => {
  
  const  adurl ='https://automationexercise.com/#google_vignette'
  const page_url = page.url()

  await page.goto('https://automationexercise.com/');
  await expect(page).toHaveTitle(/Automation/)
 
  let i = 0
  let items = ""
  let productname = "Stylish Dress"
  const women_dress = page.locator('.productinfo.text-center')

    // await page.getByRole('button',{name:'Test Cases'}).click();
  await page.locator("a[href='/products']").click()
  await page.locator("//a[@href='#Women']").click()
  const options_ = await page.locator("//div[@id='Women']//ul//li").allTextContents()
  for (const i of await page.locator("//div[@id='Women']//ul//li").allTextContents()) {
    await page.waitForLoadState('load')
    await page.getByRole('listitem').getByText('Dress').click()
    }
    // await page.waitForLoadState('networkidle') 
  await page.locator('.product-image-wrapper p').last().waitFor();
  const products = await page.locator('.product-image-wrapper p').allTextContents()
    //Dynamic way to add product
  const count = await women_dress.count()
  for (let i = 0; i < count; ++i) {
    if (await women_dress.nth(i).locator('p').textContent() === productname) {
        // console.log( women_dress.nth(i).locator('p').allInnerTexts())
      await women_dress.nth(i).locator('.add-to-cart').click()
      break

    }
    }
    //second way to add product
    // for (const i of products )
    //   {
    //     // console.log("Found prducts ",i)
    //     if (i =='Sleeveless Dress')
    //       {
    //       // console.log(await page.locator('.product-image-wrapper').filter({hasText: 'Sleeveless Dress'}).first().allInnerTexts())
    //       await page.locator('.product-image-wrapper').filter({hasText:'Sleeveless Dress'}).getByText('Add to cart').first().click()
    //     }

    //   }
    await page.locator('.modal-footer button').click()
    page.on('dialog', dialog => dialog.dismiss())
    await page.locator('div ul a').filter({ hasText: 'Cart' }).click()
    // await page.locator('div table').waitFor()  //wait for table will but if td it will not for multiple itemes in table
    await page.locator('div td').first().waitFor()  // so here we used firts() atleast to wait for first() ...To check the cart has items
    const bool = await page.locator('td h4 a').filter({ hasText: productname }).isVisible() //To validate the desired product is added and visible
    expect(bool).toBeTruthy() //To make sure the visiblity is true
    await page.locator('a', { hasText: 'Proceed To Checkout' }).click()
    // const checkoutmodal = await page.locator('#checkoutModal .modal-content').waitFor()
    // expect(checkoutmodal).toBeTruthy() //Checkout modal neeed to be visible
    // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //Signup process
    const signin_link = page.locator('#checkoutModal .modal-content a:has-text("Register / Login")')
    if (await signin_link.isVisible()) 
    {
      await page.locator('#checkoutModal .modal-content a:has-text("Register / Login")').click()
    }
    else { await page.goBack() }


    let name = "saini1"
    let email = name + "123@gmail.com"
    await login_fun(page)
    //@ts-ignore
    async function login_fun(page){
    await page.locator('.col-sm-4 .login-form').getByPlaceholder('Email Address').fill(email)
    await page.locator('.col-sm-4 .login-form').getByPlaceholder('Password').fill(email)
    await page.locator('.col-sm-4 .login-form button').click()

  }
    const error = page.locator('.col-sm-4 .login-form p')
    // const sign = await page.locator('.col-sm-4 .signup-form')

    //------------------------LOGIN ERROR-------------------------------------------------
    if (await error.isVisible()) 
    {
    if (error.filter({ hasText: '/\b incorrect \b/i' })) 
    {
    await login(page)
    }
    }
    //------------------------Sign-up ERROR-------------------------------------------------
    // @ts-ignore
    async function login(page) 
    {
      const error_signup = page.locator('.col-sm-4 .signup-form p')
      await page.locator('.col-sm-4 .signup-form').getByPlaceholder('Name').fill(name)
      await page.locator('.col-sm-4 .signup-form').getByPlaceholder('Email Address').fill(email)
      await page.locator('.col-sm-4 .signup-form button').click()
      
      if (await error_signup.isVisible()) {
      
      if (error_signup.filter({ hasText: '/\b already \b/i' }))
      {
     // await page.waitForFunction(login)
        console.log("User already exist")
      }
      
    }
    else
      {
        await login_page(page) //Fill the form or create account
      }
      
    }
    //@ts-ignore
//----------------CREATE ACCOUNT----------------------------------------------------------
    async function login_page(page) 
    {
      expect(page.locator('.col-sm-4 .login-form h2:has-text("Enter Account Information")')).toBeTruthy()
      console.log("Filling details");
      await page.locator('.col-sm-4 .login-form .clearfix .radio-inline').getByRole('radio', { name: /Mr\./i }).click()
      
      await page.locator('.col-sm-4 .login-form #password').fill(email)
      // await page.locator('.col-sm-4 .login-form').getByLabel('Date of Birth')
      // await page.locator('.col-sm-4 .login-form .selector #days').click()
      const days = page.locator('.col-sm-4 .login-form .selector #days')
      await days.selectOption('8')
      const month = page.locator('.col-sm-4 .login-form .selector #months')
      await month.selectOption('August')
      const year = page.locator('.col-sm-4 .login-form .selector #years')
      await year.selectOption('1976')
      const checkboxes_count = await page.locator('.col-sm-4 .login-form .checkbox').count()
      // const checkboxes_value = await page.locator('.col-sm-4 .login-form .checkbox').allTextContents()
      // console.log(checkboxes_value)
      for(let i =0;i<checkboxes_count;++i)
      {
        await page.locator('.col-sm-4 .login-form .checkbox').nth(i).click() 
      }

      let label=  page.locator('.col-sm-4 .login-form p')
      console.log(await label.count())
      const labeles_count = await label.count()

      for(let i =0;i<labeles_count;++i)
      {
        // console.log(await label.nth(i).textContent())
      const feild =  label.nth(i);
      const feild_data =await feild.textContent()
      // console.log(feild_data?.trim())
       switch(feild_data?.trim())
       {
        case 'First name *':
          await feild.locator('input').fill(name);
          break;
        case 'Last name *':
          await feild.locator('input').fill("lS");
          break;
        case 'Company':
          await feild.locator('input').fill("Comapnyname");
          break;
        case 'Address * (Street address, P.O. Box, Company name, etc.)':
          await feild.locator('input').fill("Address Address 1");
          break;
        case 'Address 2':
          await feild.locator('input').fill("Address 2");
          break;
        case 'State *':
          await feild.locator('input').fill("UP");
          break;
        case 'City *':
          await feild.locator('input').fill("Kurukshetra ");
          break;
        case 'Zipcode *':
          await feild.locator('input').fill("Zipcode  1");
          break;
        case 'Mobile Number *':
          await feild.locator('input').fill("41175271527 2");
          break;
        case 'Country *':
          await feild.selectOption('India')
          break;
       } //end of switch
      }//end of for

       await page.getByRole('button', { name: 'Create Account' }).click()
       const account_created =await page.locator('.col-sm-9 h2:has-text("Account Created!")').textContent()
       expect(account_created).toBeTruthy()
      console.log( account_created)
        await page.getByText('Continue').click()
      // // ------------Save detail and continue to login again-----------------
      // name = await page.locator('.col-sm-4 .login-form #name')
      // email =await page.locator('.col-sm-4 .login-form #email')      
      } //login funtion

  await page.locator('div ul a').filter({ hasText: ' Delete Account' }).click()
  const account_deletd =await page.locator('.col-sm-9 h2:has-text("Account Deleted!")').textContent()
  expect(account_deletd).toBeTruthy()
  console.log( account_deletd)
  await page.getByText('Continue').click()
      
  
     
    // await page.locator('#checkoutModal .modal-content .modal-footer button').click()
    await page.pause();
  });
  
  
