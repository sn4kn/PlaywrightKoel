import { AllSongsPage } from "./AllSongsPage"
import { HomePage } from "./HomePage"
import { LoginPage } from "./LoginPage"
import { RegistrationPage } from "./RegistrationPage"

export class POManager {
    constructor(page) {
        this.page = page
        this.AllSongsPage = new AllSongsPage(page)
        this.LoginPage = new LoginPage(page)
        this.HomePage = new HomePage(page)
        this.RegistrationPage = new RegistrationPage(page)
    }
}
