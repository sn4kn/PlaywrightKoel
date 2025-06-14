export class LoginPage{
    constructor(page){
        this.page=page
        this.logInButton= page.locator("[type='submit']")
        this.userName = page.locator("[type='email']")
        this.password = page.locator("[type='password']")
    }

    
}