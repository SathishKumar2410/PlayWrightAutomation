const { test, expect } = require('@playwright/test');


test.only('End to End Test', async ({ page }) => {

    const productName = 'ZARA COAT 3';
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('dummyplaywright@gmail.com');
    await page.locator('#userPassword').fill('Playwright@123');
   // await page.click("[name='login']");
   await page.locator("[name='login']").dispatchEvent('click');
    await page.waitForLoadState('networkidle');
    const productTitle = await page.locator('.card-body b').allTextContents();
    console.log(productTitle);
    const count = productTitle.length;
    for (let i = 0; i < count; ++i) {
        if(productTitle[i]===productName)
        {
            await page.locator("div  button.btn.w-10.rounded").nth(i).click();
            break;
        }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator('div.infoWrap h3').first().waitFor();
    const isVisible = await page.locator('div.infoWrap h3').isVisible();
    expect(isVisible).toBeTruthy();
    expect(await page.locator(".totalRow [type='button']").isVisible()).toBeTruthy();
    await page.locator(".totalRow [type='button']").click(); 
    const value = await page.locator(".payment__type.payment__type--cc").getAttribute("class");
    console.log(value);
    expect(value.includes("active")).toBeTruthy();
    await page.locator('form div:nth-child(2) div:nth-child(2) input').fill('234');
    await page.locator('form div:nth-child(3) div input').fill("Dummy");
    expect(await (page.locator(".user__name label+input").textContent()) === 'dummyplaywright@gmail.com');
    await page.locator('[placeholder="Select Country"]').pressSequentially('Ind');
    await page.locator('.form-group section button:nth-child(3)').waitFor();
    await page.locator('.form-group section button:nth-child(3)').click();
    await page.locator(".action__submit").click();
    await page.locator("table tr td h1").waitFor();
    await expect(page.locator("table tr td h1")).toHaveText("Thankyou for the order.");
    const orderId = (await page.locator("table tr:nth-child(3) label").textContent()).split(' ')[2];
    console.log(orderId);
    await page.click("ul:nth-child(4) li:nth-child(3)");
    const orderIds = await page.locator("table.table tbody tr th").allTextContents();
    for(let i=0; i < orderId.length; ++i)
    {
        expect(( page.locator("table.table tbody tr th").nth(i)).textContent===orderId);
    }
 })