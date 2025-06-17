import { v4 as uuidv4 } from 'uuid'
import { test, expect } from '@playwright/test'
import { RegistrationPage } from '../pages/RegistrationPage'

test('should show error for personal email or invalid email format @smoke', async ({ page }) => {
  const registrationPage = new RegistrationPage(page)
  await page.goto('/registration')
  await registrationPage.fillEmailAndSubmit(`${uuidv4()}@gmail.com`)
  await expect(registrationPage.errMsg).toBeVisible()
})