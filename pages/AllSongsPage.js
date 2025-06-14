export class AllSongsPage{
    constructor(page){
        this.page=page
    }

    async playSong(name) {
        const songName = this.page.locator(`td:has-text('${name}')`)
        await songName.dblclick()
    }
}