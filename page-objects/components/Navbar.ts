import { expect, Locator, Page } from "@playwright/test"

export class Navbar {
    readonly page: Page
    readonly accountSummary: Locator
    readonly accountActivity: Locator
    readonly transferFunds: Locator
    readonly payBills: Locator
    readonly myMoneyApp: Locator
    readonly onlineStatements: Locator

    constructor(page: Page) {
        this.page = page
        this.accountSummary = page.locator('text=Account Summary')
        this.accountActivity = page.locator('text=Account Activity')
        this.transferFunds = page.locator('text=Transfer Funds')
        this.payBills = page.locator('text=Pay Bills')
        this.myMoneyApp = page.locator('text=My Money Map')
        this.onlineStatements = page.locator('text=Online Statements')
    }

    async clickOnTab(tabName) {
        switch (tabName) {
            case 'Account Summary':
                await this.accountSummary.click
                    break
            case 'Account Activity':
                await this.accountActivity.click
                    break
            case 'Transfer Funds':
                await this.transferFunds.click
                    break
            case 'Pay Bills':
                await this.payBills.click
                    break
            case 'My Money App':
                await this.myMoneyApp.click
                    break
            case 'Online Statements':
                await this.onlineStatements.click
                    break
            default:
                throw new Error('This tab does not exist...')
        }
    }
}