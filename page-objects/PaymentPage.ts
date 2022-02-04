import { expect, Locator, Page } from "@playwright/test"

export class PaymentPage {
    readonly page: Page
    readonly payeeSelectbox: Locator
    readonly payeeDetailButton: Locator
    readonly payeeDetail: Locator
    readonly accountSelectBox: Locator
    readonly amountInput: Locator
    readonly dateInput: Locator
    readonly descriptionInput: Locator
    readonly submitPaymentButton: Locator
    readonly message: Locator


    constructor(page: Page) {
        this.page = page
        this.payeeSelectbox = page.locator('#sp_payee')
        this.payeeDetailButton = page.locator('#sp_get_payee_details')
        this.payeeDetail = page.locator('#sp_payee_details')
        this.accountSelectBox = page.locator('#sp_account')
        this.amountInput = page.locator('#sp_amount')
        this.dateInput = page.locator('#sp_date')
        this.descriptionInput = page.locator('#sp_description')
        this.submitPaymentButton = page.locator('#pay_saved_payees')
        this.message = page.locator('#alert_content > span')
    }

    async createPayment() {
        await this.payeeSelectbox.selectOption('apple')
        await this.payeeDetailButton.click()
        await expect(this.payeeDetail).toBeVisible()
        await this.accountSelectBox.selectOption('6')
        await this.amountInput.type('5000')
        await this.dateInput.type('2021-11-09')
        await this.descriptionInput.type('some message')
        await this.submitPaymentButton.click()
    }

    async assertSuccessMessage() {
        await expect(this.message).toBeVisible()
        await expect(this.message).toContainText('The payment was successfully submitted.')
    }

}