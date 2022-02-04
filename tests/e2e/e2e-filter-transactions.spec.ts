import {test, expect} from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe('filter transactions', () => {
    let homePage: HomePage
    let loginPage: LoginPage
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)

        homePage.visit()
        homePage.clickOnSignInButton()
        loginPage.login('username', 'password')
    })

    test('verify the results of each account', async ({ page }) => {
        await page.click('#account_activity_tab')
        await page.selectOption('#aa_accountId', '2')

        const checkingAccount = await page.locator('#all_transactions_for_account tbody tr')
        await expect(checkingAccount).toHaveCount(3)

        await page.selectOption('#aa_accountId', '4')
        const loanAccount = await page.locator('#all_transactions_for_account tbody tr')

        await expect(loanAccount).toHaveCount(2)

        await page.selectOption('#aa_accountId', '6')
        const brokerageAccount = await page.locator('.well')

        await expect(brokerageAccount).toBeVisible()
    })
})