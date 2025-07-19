import { test, expect } from '@playwright/test';

const jobtitles = {

    jobtitle1: "CEO",
    jobtitle2: "CFO",
    jobtitle3: "COO",

}

for (let title in jobtitles ){

    
test(`example for looping test data - DDT - ${jobtitles[title]} `, async ({ page }) => {


    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    await page.locator(`input[name='username']`).fill("Admin")
    await page.locator("input[type='password']").fill("admin123")
    await page.locator("button[type='submit']").click()

    // Assertions
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')

    await page.locator('a[href="/web/index.php/admin/viewAdminModule"]').click()
    await page.locator("//span[normalize-space(text())='Job']").click()
    await page.locator("//a[normalize-space(text())='Job Titles']").click()
    await page.locator('button[class="oxd-button oxd-button--medium oxd-button--secondary"]').click()
    let randomtext = (Math.random() + 1).toString(36).substring(7);  // generate random 5 chars 
    await page.locator("(//label[normalize-space(text())='Job Title']/following::input)[1]").fill(jobtitles[title]+ randomtext)
    await page.locator("//textarea[@placeholder='Type description here']").fill("Job description")
    await page.locator('button[type="submit"]').click()

    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewJobTitleList')

})

}
