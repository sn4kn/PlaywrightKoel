import { v4 as uuidv4 } from 'uuid'
import { test, expect } from '@playwright/test'
import { POManager } from '../pages/POManager'

let pom

test.beforeEach(async ({ page }) => {
    pom = new POManager(page)
    await page.goto('/')
})

test.afterEach(async ({ page }) => {
    await page.close()
})

test('should display correct login page title @smoke', async ({ page }) => {
    await expect(page).toHaveTitle('Koel')
})

test('should log in with valid credentials and navigate to home @smoke', async ({ page }) => {
    await pom.LoginPage.login(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD)
    await expect(page).toHaveURL('https://qa.koel.app/#!/home')
})

test('should not log in with invalid credentials @smoke @regression', async ({ page }) => {
    await pom.LoginPage.login(`${uuidv4()}@gmail.com`, `${uuidv4()}`)
    await expect(page).toHaveURL('https://qa.koel.app/')
})

test('should navigate to registration page @smoke', async ({ page }) => {
    await pom.LoginPage.clickOnRegistration()
    await expect(page).toHaveURL('https://qa.koel.app/registration')
})