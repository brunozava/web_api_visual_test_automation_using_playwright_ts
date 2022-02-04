import { test, expect } from '@playwright/test'

import { loadHomepage, assertTitle } from '../helpers'

test.describe('first test suite', () => {

    test('simple basic test @firstTest', async ({ page }) => {
        await page.goto('https://www.example.com')
        const pageTitle = await page.locator('h1')
        await expect(pageTitle).toContainText('Example Domain')
    })
    
    test('clicking on elements @cickingOnElements', async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.click('#signin_button')
        await page.click('text=Sign in')
    
        const errorMessage = await page.locator('.alert-error')
        await expect(errorMessage).toContainText('Login and/or password are wrong.')
    })
    
    test ('working with inputs @inputs', async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.click('#signin_button')
    
        await page.type('#user_login', 'some username')
        await page.type('#user_password', 'some password')
        await page.click('text=Sign in')
    
        const errorMessage = await page.locator('.alert-error')
        await expect(errorMessage).toContainText('Login and/or password are wrong.')
    })
    
    test('assertions @assertions', async ({ page }) => {
        await page.goto('https://www.example.com')
        await expect(page).toHaveURL('https://www.example.com')
        await expect(page).toHaveTitle('Example Domain')
    
        const element = await page.locator('h1')
        await expect(element).toBeVisible()
        await expect(element).toHaveText('Example Domain')
        await expect(element).toHaveCount(1)
    
        const nonExistingElement = await page.locator('h5')
        await expect(nonExistingElement).not.toBeVisible()
    })

test.describe('taking screenshots', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.example.com')
    })

    test('taking screenshot @screenshot', async ({ page }) => {
        await page.screenshot({ path: 'screenshot.png', fullPage: true})
    })

    test('taking a single element screenshot @elscreenshot', async ({ page }) => {
        const element = await page.$('h1')
        await element.screenshot({ path: 'single_element_screenshot.png'})
    })
})

test('custom helpers', async ({ page }) => {
    await loadHomepage(page)
    await assertTitle(page)
})


})

