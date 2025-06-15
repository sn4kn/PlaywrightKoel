export class AllSongsPage{
    constructor(page){
        this.page=page
        this.addTo = page.locator(".btn-add-to")
    }

    async clickOnSong(name) {
        const songName = this.page.locator(`td:has-text('${name}')`)
        await songName.click()
    }

    async playSong(name) {
        const songName = this.page.locator(`td:has-text('${name}')`)
        await songName.dblclick()
    }

    async addSongToPlaylist(playlistName){
        await this.addTo.click()
        await this.page.locator('#songsWrapper').getByText(`${playlistName}`).click()
    }
}