import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'

test("should create and display new playlist", async ({ page }) => {
    const playlistName = "Rock"
    const homePage = new HomePage(page)
    const loginPage = new LoginPage(page)
    await page.goto("/")
    await loginPage.validLogin(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD)
    await homePage.createPlaylist(playlistName)
    await expect(homePage.currentPlaylistSelected(`${playlistName}`)).toBeVisible()
})

