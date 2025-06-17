import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { AllSongsPage } from '../pages/AllSongsPage'

test('should play selected song @smoke @regression', async ({ page }) => {
    const homePage = new HomePage(page)
    const loginPage = new LoginPage(page)
    const allSongsPage = new AllSongsPage(page)
    const name = 'Lament'
    await page.goto('/')
    await loginPage.login(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD)
    await homePage.clickOnAllSongs()
    await allSongsPage.playSong(name)
    await expect(homePage.getCurrentPlayingSongTitle()).toContainText(name)
})