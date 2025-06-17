import { v4 as uuidv4 } from 'uuid'
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

test('should display selected playlist @smoke', async ({ page }) => {
    const playlistName = `Playlist-${uuidv4()}`
    await pom.LoginPage.login(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD)
    if (!(await pom.HomePage.playlistExist(playlistName).isVisible())) {
        await pom.HomePage.createPlaylist(playlistName)
    }
    await expect(pom.HomePage.currentPlaylistSelected(`${playlistName}`)).toBeVisible()
    await pom.HomePage.clickOnDeleteBtn()
    await expect(pom.HomePage.playlistExist(playlistName)).not.toBeVisible()
})

