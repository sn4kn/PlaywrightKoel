import { v4 as uuidv4 } from 'uuid'
import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'

test('should display selected playlist @smoke', async ({ page }) => {
    const playlistName = `Playlist-${uuidv4()}`
    const homePage = new HomePage(page)
    const loginPage = new LoginPage(page)
    await page.goto('/')
    await loginPage.login(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD)
    if (!(await homePage.playlistExist(playlistName).isVisible())) {
        await homePage.createPlaylist(playlistName)
    }
    await expect(homePage.currentPlaylistSelected(`${playlistName}`)).toBeVisible()
    await homePage.clickOnDeleteBtn()
    await expect(homePage.playlistExist(playlistName)).not.toBeVisible()
})

