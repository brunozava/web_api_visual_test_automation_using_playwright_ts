import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import {FeedbackPage} from '../../page-objects/FeedbackPage'

test.describe('feedback form', () => {
    let homePage: HomePage
    let feedbackPage: FeedbackPage
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        feedbackPage = new FeedbackPage(page)

        await homePage.visit()
        await homePage.clickOnFeedbackink()
    })

    test('reset feedback form', async ({ page }) => {
        await feedbackPage.fillForm('some name', 'some email', 'some subject', 'some comment')
        await feedbackPage.resetForm()
        await feedbackPage.assertReset()
    })

    test('submit feedback form', async ({ page }) => {
        await feedbackPage.fillForm('some name', 'some email', 'some subject', 'some comment')
        await feedbackPage.submitForm()
        await feedbackPage.feedbackFormSent()
    })
})