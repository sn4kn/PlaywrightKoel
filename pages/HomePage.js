import Actions from "../utils/Actions"

export class HomePage {
    constructor(page) {
        this.page = page;
        this.createPlaylistButton = page.locator('[title="Create a new playlist"]')
        this.newPlaylistButton = page.locator('.playlist-menu li:first-child')
        this.createPlaylistField = page.locator('[placeholder="↵ to save"]')
        this.allSongs = page.locator('li .songs')
        this.currentPlayingSongTitle = page.locator('#progressPane>h3')
        this.deletePlaylistButton = page.locator('[title = "Delete this playlist"]')
        this.editPlaylistButton = page.locator('nav[class="menu playlist-item-menu"] li:has-text("Edit")')
        this.deleteConfirm = page.locator('.ok')
    }

    async clickOnPlaylist(name) {
        const playlistName = this.page.locator(`a:has-text("${name}")`)
        await playlistName.click()
    }

    currentPlaylistSelected(name) {
        return this.page.locator(`h1:has-text("${name}")`)
    }

    playlistExist(name) {
        return this.page.locator(`li a:has-text("${name}")`)
    }

    getCurrentPlayingSongTitle() {
        return this.currentPlayingSongTitle
    }

    async clickOnAllSongs() {
        await this.allSongs.click()
    }

    async createPlaylist(name) {
        await this.createPlaylistButton.click()
        await this.newPlaylistButton.click()
        await this.createPlaylistField.type(name)
        await this.createPlaylistField.press('Enter')
    }

    async clickOnDeleteBtn() {
        await this.deletePlaylistButton.click()
    }

    getSongInPlaylist(name) {
        return this.page.getByRole('cell', { name: `${name}` })
    }
    
}