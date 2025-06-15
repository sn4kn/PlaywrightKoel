import { v4 as uuidv4 } from 'uuid'
import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'

test("should create and display new playlist", async ({ page }) => {
    const playlistName = `Playlist-${uuidv4()}`
    const homePage = new HomePage(page)
    const loginPage = new LoginPage(page)
    await page.goto("/")
    await loginPage.validLogin(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD)
    if (!(await homePage.playlistExist(playlistName).isVisible())) {
        await homePage.createPlaylist(playlistName)
    }
    await expect(homePage.currentPlaylistSelected(`${playlistName}`)).toBeVisible()
    await homePage.clickOnDeleteBtn()
    await expect(homePage.playlistExist(playlistName)).not.toBeVisible()
})

test("should create and delete a playlist successfully", async ({ page }) => {
    const playlistName = `Playlist-${uuidv4()}`
    const homePage = new HomePage(page)
    const loginPage = new LoginPage(page)
    await page.goto("/")
    await loginPage.validLogin(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD)
    await homePage.createPlaylist(playlistName)
    await expect(homePage.currentPlaylistSelected(`${playlistName}`)).toBeVisible()
    await homePage.clickOnDeleteBtn()
    await expect(homePage.playlistExist(playlistName)).not.toBeVisible()
})

