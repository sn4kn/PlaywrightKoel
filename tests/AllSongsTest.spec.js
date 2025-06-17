import { test, expect } from '@playwright/test'
import { POManager } from '../pages/POManager'

let pom

test.beforeEach(async ({ page }) => {
    pom = new POManager(page)
    await page.goto('/')
})

test.afterEach(async ({ page }) => {
    await page.close()
})

test('should play selected song @smoke @regression', async ({ page }) => {
    const NAME = 'Lament'
    await pom.LoginPage.login(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD)
    await pom.HomePage.clickOnAllSongs()
    await pom.AllSongsPage.playSong(NAME)
    await expect(pom.HomePage.getCurrentPlayingSongTitle()).toContainText(NAME)
})