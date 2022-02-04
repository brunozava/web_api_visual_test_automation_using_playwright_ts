import { test, expect} from '@playwright/test'

test.describe('visual regression testing ', () => {
    test('full page snapshot', async ({ page }) => {
        await page.goto('https://www.example.com')
        expect(await page.screenshot()).toMatchSnapshot('homepage.png')
    })

    test('single element snapshot', async ({ page }) => {
        await page.goto('https://www.example.com')
        const pageElement = await page.$('h1')
        expect(await pageElement.screenshot()).toMatchSnapshot('page-title.png')
    })
})