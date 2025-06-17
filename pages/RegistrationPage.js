import TestActions from "../utils/testActions"

export class RegistrationPage {
    constructor(page) {
        this.page = page
        this.logInButton = page.locator('[type="submit"]')
        this.emailField = page.locator('[placeholder="Email"]')
        this.submitBtn = page.locator('[value="Submit"]')
        this.errMsg = page.locator('form div:has-text("Sorry, only certain emails are allowed, please do not use your personal email")')
    }

    async fillEmailAndSubmit(email) {
        await this.emailField.type(email)
        await this.submitBtn.click()
    }
}