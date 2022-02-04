import {test, expect} from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe('transfer funds and make payments', () => {
    let homePage: HomePage
    let loginPage: LoginPage
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)

        homePage.visit()
        homePage.clickOnSignInButton()
        loginPage.login('username', 'password')
    })

    test('transfer funds', async ({ page }) => {
        await page.click('#transfer_funds_tab')
        await page.selectOption('#tf_fromAccountId', '2')
        await page.selectOption('#tf_toAccountId', '3')
        await page.type('#tf_amount', '500')
        await page.type('#tf_description', 'Test Message')
        await page.click('#btn_submit')

        const boardHeader = await page.locator('.board-header')
        await expect(boardHeader).toContainText('Transfer Money & Make Payments - Verify')

        await page.click('#btn_submit')
        const alertSuccess = await page.locator('.alert-success')

        await expect(alertSuccess).toHaveText('You successfully submitted your transaction.')

    })
})