import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test("1",async ({page})=>{
await page.goto("https://google.com")
await expect(page).toHaveURL(/google/);
const loginPage = new LoginPage(page);
})