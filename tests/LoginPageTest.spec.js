import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'

test("login page title", async ({ page }) => {
    await page.goto("/")
    await expect(page).toHaveTitle("Koel")
})

test("login with valid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page)
    await page.goto("/")
    await loginPage.validLogin("andrii.banak@testpro.io","YWmFWK7$QTp7M!9")
    await expect(page).toHaveURL("https://qa.koel.app/#!/home")
})