export class HomePage {
    constructor(page) {
        this.page = page;
        this.createPlaylistButton = page.locator("[title='Create a new playlist']")
        this.newPlaylistButton = page.locator(".playlist-menu li:first-child")
        this.createPlaylistField = page.locator("[placeholder='↵ to save']")
        this.allSongs = page.locator("li .songs")
        this.currentPlayingSongTitle = page.locator("#progressPane>h3")
        this.deletePlaylistButton = page.locator("[title = 'Delete this playlist']")
        this.editPlaylistButton = page.locator("li:has-text('Edit')")
    }

    async clickOnPlaylist(name) {
        const playlistName = this.page.locator(`a:has-text('${name}')`)
        await playlistName.click()
    }
    currentPlaylistSelected(name) {
        return this.page.locator(`h1:has-text('${name}')`)
    }
}