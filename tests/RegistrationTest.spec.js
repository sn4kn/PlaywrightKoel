import { test, expect } from '@playwright/test'
import { RegistrationPage } from '../pages/RegistrationPage'

test('should show error for personal email or invalid email format', async ({ page }) => {
  const registrationPage = new RegistrationPage(page)
  await page.goto('/registration')
  await registrationPage.fillEmailAndSubmit("xxx@gmail.com")
  await expect(registrationPage.errMsg).toBeVisible()
});