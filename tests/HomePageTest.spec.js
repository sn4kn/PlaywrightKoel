import * as dotenv from "dotenv"
dotenv.config()
import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'

test('should display selected playlist', async ({ page }) => {
    const name = 'Rap'; // set playlist name
    const homePage = new HomePage(page)
    const loginPage = new LoginPage(page)
    await page.goto("/")
    await loginPage.validLogin("andrii.banak@testpro.io", process.env.ADMIN_PASSWORD)
    await homePage.clickOnPlaylist(`${name}`)
    await expect(homePage.currentPlaylistSelected(`${name}`)).toBeVisible()
})
