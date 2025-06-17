import { v4 as uuidv4 } from 'uuid'
import { test, expect } from '@playwright/test'
import { POManager } from '../pages/POManager'

let pom

test.beforeEach(async ({ page }) => {
  pom = new POManager(page)
})

test.afterEach(async ({ page }) => {
  await page.close()
})

test('should show error for personal email or invalid email format @smoke', async ({ page }) => {
  await page.goto('/registration')
  await pom.RegistrationPage.fillEmailAndSubmit(`${uuidv4()}@gmail.com`)
  await expect(pom.RegistrationPage.errMsg).toBeVisible()
})