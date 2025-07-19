const { test, expect } = require('@playwright/test');
import { loginPage } from "../pageObjects/loginpage.po"
import logindata from "../testData/login.json"
import { addEmployeePage } from "../pageObjects/addemployeepage.po"
import addemployeedata from "../testData/addemployee.json"

let page
let login
let addemployee

test.describe("Verify login funtionality", async () => {

    test.beforeEach(async ({ browser }) => {

        page = await browser.newPage()

        login = new loginPage(page)
        addemployee = new addEmployeePage(page)

        await login.launchUrl()
        await login.loginwithcreds(logindata.username, logindata.password)

        await login.loginSucces()

        await addemployee.navigatePIM()
        await addemployee.navigateAddEmployee()
    })

    test("Verify creation of Employee", async () => {

        await addemployee.createEmployee(addemployeedata.firstname, addemployeedata.lastname)
        await addemployee.verifySuccess()

    })


    test("Verify  Error Messages for Mandatoryu fileds", async () => {

        await addemployee.verifyErrorMsgMandatoryFileds()

    })



})