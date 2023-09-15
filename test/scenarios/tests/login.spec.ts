import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

var myEnv = dotenv.config({ path: '../oidc/.env' })
dotenvExpand.expand(myEnv)

test('SSO first login', async ({ page }) => {
  // Landing page
  await page.goto('/');
  await page.getByLabel(/Email address/).fill(process.env.TEST_USER_MAIL);
  await page.getByRole('button', { name: 'Continue' }).click();

  // Unlock page
  await page.getByRole('link', { name: /Enterprise single sign-on/ }).click();

  // Keycloak Login page
  await expect(page.getByRole('heading', { name: 'Sign in to your account' })).toBeVisible();
  await page.getByLabel(/Username/).fill(process.env.TEST_USER);
  await page.getByLabel('Password').fill(process.env.TEST_USER_PASSWORD);
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Back to Vault create account
  await expect(page).toHaveTitle(/Set master password/);
  await page.getByLabel('Master password', { exact: true }).fill('Master password');
  await page.getByLabel('Re-type master password').fill('Master password');
  await page.getByRole('button', { name: 'Submit' }).click();

  // We are now in the default vault page
  await expect(page).toHaveTitle(/Vaults/);
});

test('SSO second login', async ({ page }) => {
  // Landing page
  await page.goto('/');
  await page.getByLabel(/Email address/).fill(process.env.TEST_USER_MAIL);
  await page.getByRole('button', { name: 'Continue' }).click();

  // Unlock page
  await page.getByRole('link', { name: /Enterprise single sign-on/ }).click();

  // Keycloak Login page
  await expect(page.getByRole('heading', { name: 'Sign in to your account' })).toBeVisible();
  await page.getByLabel(/Username/).fill(process.env.TEST_USER);
  await page.getByLabel('Password').fill(process.env.TEST_USER_PASSWORD);
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Back to Vault unlock page
  await expect(page).toHaveTitle('Vaultwarden Web');
  await page.getByLabel('Master password').fill('Master password');
  await page.getByRole('button', { name: 'Unlock' }).click();

  // We are now in the default vault page
  await expect(page).toHaveTitle(/Vaults/);
});
