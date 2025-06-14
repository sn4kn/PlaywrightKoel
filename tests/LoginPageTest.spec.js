import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'

test("login page title",async ({page})=>{
await page.goto("/")
await expect(page).toHaveTitle("Koel")
})