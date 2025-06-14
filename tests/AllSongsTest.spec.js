import * as dotenv from "dotenv"
dotenv.config()
import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { AllSongsPage } from "../pages/AllSongsPage"

test('should play selected song', async ({ page }) => {
    const homePage = new HomePage(page)
    const loginPage = new LoginPage(page)
    const allSongsPage = new AllSongsPage(page)
    const name = "Lament"
    await page.goto("/")
    await loginPage.validLogin("andrii.banak@testpro.io", process.env.ADMIN_PASSWORD)
    await homePage.clickOnAllSongs()
    await allSongsPage.playSong(name)
    await expect(homePage.getCurrentPlayingSongTitle()).toContainText(name)
})