import { test, expect } from '@playwright/test'
import { getRandomNumber, getRandomString } from '../../utils/data-helpers'

test.describe.only('tips & tricks section', () => {
    test('testInfo object', async ({ page }, testInfo) => {
        await page.goto('https://www.example.com')
        //console.log(testInfo)
        //console.log(testInfo.title)
        //console.log(testInfo.expectedStatus)
        let newNumber = await getRandomNumber()
        let newString = await getRandomString()
        console.log(newNumber)
        console.log(newString)
    })

    test('test skip browser', async ({ page, browserName }) => {
        test.skip(browserName === 'chromium', 'Feature not ready ti chrome browser' )
        await page.goto('https://www.example.com')
    })

    test('test fixme annotation', async ({ page, browserName }) => {
        test.fixme(browserName === 'chromium', 'Test is not stable, needs revision' )
        await page.goto('https://www.example.com')
    })

    const people = ['Mike', 'Judy', 'Peter', 'Elon', 'Aice']
    for (const name of people) {
        test(`Running test for ${name}`, async ({ page }) => {
            await page.goto('http://zero.webappsecurity.com/index.html')
            await page.type('#searchTerm', `${name}`)
            await page.waitForTimeout(3000)
        })
    }

    test('mouse movement simulation', async ({ page }) => {
        await page.goto('https://www.example.com')
        await page.mouse.move(0, 0)
        await page.mouse.down()
        await page.mouse.move(0, 100)
        await page.mouse.up()
    })

    test('mutiple browser tabs inside 1 browser', async ({ browser }) => {
        const context = await browser.newContext()
        const page1 = await context.newPage()
        const page2 = await context.newPage()
        const page3 = await context.newPage()
        await page1.goto('https://www.example.com')
        await page2.goto('https://www.example.com')
        await page3.goto('https://www.example.com')
        await page1.waitForTimeout(5000)
    })
})