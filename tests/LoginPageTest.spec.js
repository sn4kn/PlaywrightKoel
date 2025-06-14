import * as dotenv from "dotenv"
dotenv.config()
import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'

test("login page title", async ({ page }) => {
    await page.goto("/")
    await expect(page).toHaveTitle("Koel")
})

test("login with valid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page)
    await page.goto("/")
    await loginPage.validLogin("andrii.banak@testpro.io", process.env.ADMIN_PASSWORD)
    await expect(page).toHaveURL("https://qa.koel.app/#!/home")
})