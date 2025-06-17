export class LoginPage {
    constructor(page) {
        this.page = page
        this.logInButton = page.locator('[type="submit"]')
        this.userName = page.locator('[type="email"]')
        this.password = page.locator('[type="password"]')
        this.registration = page.locator('a:has-text("Registration")')
    }

    async validLogin(username, password) {
        await this.userName.type(username)
        await this.password.type(password)
        await this.logInButton.click()
    }

    async clickOnRegistration() {
        await this.registration.click()
    }
}