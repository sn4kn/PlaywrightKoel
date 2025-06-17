import { v4 as uuidv4 } from 'uuid'
import { test, expect } from '@playwright/test'
import { POManager } from '../pages/POManager'

let pom
let playlistName

test.beforeEach(async ({ page }) => {
    playlistName = `Playlist-${uuidv4()}`
    pom = new POManager(page)
    await page.goto('/')
    await pom.LoginPage.login(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD)
})

test.afterEach(async ({ page }) => {
    await page.close()
})

test('should create and display new playlist @smoke @regression', async () => {
    if (!(await pom.HomePage.playlistExist(playlistName).isVisible())) {
        await pom.HomePage.createPlaylist(playlistName)
    }
    await expect(pom.HomePage.currentPlaylistSelected(`${playlistName}`)).toBeVisible()
    await pom.HomePage.clickOnDeleteBtn()
    await expect(pom.HomePage.playlistExist(playlistName)).not.toBeVisible()
})

test('should create and delete a playlist successfully @smoke', async () => {
    if (!(await pom.HomePage.playlistExist(playlistName).isVisible())) {
        await pom.HomePage.createPlaylist(playlistName)
    }
    await expect(pom.HomePage.currentPlaylistSelected(`${playlistName}`)).toBeVisible()
    await pom.HomePage.clickOnDeleteBtn()
    await expect(pom.HomePage.playlistExist(playlistName)).not.toBeVisible()
})

test('should create, rename and delete a playlist successfully @smoke', async () => {
    const newPlaylistName = `Playlist-${uuidv4()}`
    if (!(await pom.HomePage.playlistExist(playlistName).isVisible())) {
        await pom.HomePage.createPlaylist(playlistName)
    }
    await expect(pom.HomePage.currentPlaylistSelected(`${playlistName}`)).toBeVisible()
    await pom.HomePage.playlistExist(playlistName).click({ button: 'right' })
    await pom.HomePage.editPlaylistButton.click()
    await pom.HomePage.playlistExist(playlistName).press('Control+A');
    await pom.HomePage.playlistExist(playlistName).press('Backspace');
    await pom.HomePage.playlistExist(playlistName).type(newPlaylistName)
    await pom.HomePage.playlistExist(playlistName).press('Enter')
    await expect(pom.HomePage.playlistExist(newPlaylistName)).toBeVisible()
    await pom.HomePage.clickOnDeleteBtn()
    await expect(pom.HomePage.playlistExist(newPlaylistName)).not.toBeVisible()
})

test('should create playlist, add song, and delete playlist @smoke', async () => {
    if (!(await pom.HomePage.playlistExist(playlistName).isVisible())) {
        await pom.HomePage.createPlaylist(playlistName)
    }
    await expect(pom.HomePage.currentPlaylistSelected(`${playlistName}`)).toBeVisible()
    await pom.HomePage.clickOnAllSongs()
    await pom.AllSongsPage.clickOnSong('Lament')
    await pom.AllSongsPage.addSongToPlaylist(playlistName)
    await pom.HomePage.playlistExist(playlistName).click()
    await expect(pom.HomePage.getSongInPlaylist('Lament')).toBeVisible()
    await pom.HomePage.clickOnDeleteBtn()
    await pom.HomePage.deleteConfirm.click()
    await expect(pom.HomePage.playlistExist(playlistName)).not.toBeVisible()
})