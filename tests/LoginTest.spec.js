import { v4 as uuidv4 } from 'uuid'
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

test("should not log in with invalid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page)
    await page.goto("/")
    await loginPage.validLogin(`${uuidv4()}@gmail.com`, `${uuidv4()}`)
    await expect(page).toHaveURL("https://qa.koel.app/")
})

test("should navigate to registration page", async ({ page }) => {
    const loginPage = new LoginPage(page)
    await page.goto("/")
    await loginPage.clickOnRegistration()
    await expect(page).toHaveURL("https://qa.koel.app/registration")
})