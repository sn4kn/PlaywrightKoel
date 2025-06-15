import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'

test("should display correct login page title", async ({ page }) => {
    await page.goto("/")
    await expect(page).toHaveTitle("Koel")
})

test("should log in with valid credentials and navigate to home", async ({ page }) => {
    const loginPage = new LoginPage(page)
    await page.goto("/")
    await loginPage.validLogin(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD)
    await expect(page).toHaveURL("https://qa.koel.app/#!/home")
})