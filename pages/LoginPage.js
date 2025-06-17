import TestActions from "../utils/testActions"

export class LoginPage {
    constructor(page) {
        this.page = page
        this.action = new TestActions(page)
        this.logInButton = '[type="submit"]'
        this.userName = '[type="email"]'
        this.password = '[type="password"]'
        this.registration = 'a:has-text("Registration")'
    }

    async login(username, password) {
        await this.action.fill(this.userName,username)
        await this.action.fill(this.password,password)
        await this.action.click(this.logInButton)
    }

    async clickOnRegistration() {
        await this.action.click(this.registration)
    }
}