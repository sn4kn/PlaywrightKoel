import { v4 as uuidv4 } from 'uuid'
import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { AllSongsPage } from '../pages/AllSongsPage'

let loginPage
let homePage
let allSongsPage
let playlistName

test.beforeEach(async ({ page }) => {
    playlistName = `Playlist-${uuidv4()}`
    loginPage = new LoginPage(page)
    homePage = new HomePage(page)
    allSongsPage = new AllSongsPage(page)
    await page.goto('/')
    await loginPage.validLogin(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD)
});

test('should create and display new playlist @smoke @regression', async () => {
    if (!(await homePage.playlistExist(playlistName).isVisible())) {
        await homePage.createPlaylist(playlistName)
    }
    await expect(homePage.currentPlaylistSelected(`${playlistName}`)).toBeVisible()
    await homePage.clickOnDeleteBtn()
    await expect(homePage.playlistExist(playlistName)).not.toBeVisible()
})

test('should create and delete a playlist successfully @smoke', async () => {
    if (!(await homePage.playlistExist(playlistName).isVisible())) {
        await homePage.createPlaylist(playlistName)
    }
    await expect(homePage.currentPlaylistSelected(`${playlistName}`)).toBeVisible()
    await homePage.clickOnDeleteBtn()
    await expect(homePage.playlistExist(playlistName)).not.toBeVisible()
})

test('should create, rename and delete a playlist successfully @smoke', async () => {
    const newPlaylistName = `Playlist-${uuidv4()}`
    if (!(await homePage.playlistExist(playlistName).isVisible())) {
        await homePage.createPlaylist(playlistName)
    }
    await expect(homePage.currentPlaylistSelected(`${playlistName}`)).toBeVisible()
    await homePage.playlistExist(playlistName).click({ button: 'right' })
    await homePage.editPlaylistButton.click()
    await homePage.playlistExist(playlistName).press('Control+A');
    await homePage.playlistExist(playlistName).press('Backspace');
    await homePage.playlistExist(playlistName).type(newPlaylistName)
    await homePage.playlistExist(playlistName).press('Enter')
    await expect(homePage.playlistExist(newPlaylistName)).toBeVisible()
    await homePage.clickOnDeleteBtn()
    await expect(homePage.playlistExist(newPlaylistName)).not.toBeVisible()
})

test('should create playlist, add song, and delete playlist @smoke', async () => {
    if (!(await homePage.playlistExist(playlistName).isVisible())) {
        await homePage.createPlaylist(playlistName)
    }
    await expect(homePage.currentPlaylistSelected(`${playlistName}`)).toBeVisible()
    await homePage.clickOnAllSongs()
    await allSongsPage.clickOnSong('Lament')
    await allSongsPage.addSongToPlaylist(playlistName)
    await homePage.playlistExist(playlistName).click()
    await expect(homePage.getSongInPlaylist('Lament')).toBeVisible()
    await homePage.clickOnDeleteBtn()
    await homePage.deleteConfirm.click()
    await expect(homePage.playlistExist(playlistName)).not.toBeVisible()
})