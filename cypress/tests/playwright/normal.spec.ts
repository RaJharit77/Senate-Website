import { test, expect } from '@playwright/test';

test.describe('Normal Tests', () => {
    test('contact form submission', async ({ page }) => {
        await page.goto('/contact');
        await page.click('button[type="submit"]');
        await expect(page.locator('[data-testid="error-message"]')).toBeVisible();

        await page.fill('input[name="name"]', 'Jane Doe');
        await page.fill('input[name="email"]', 'jane@example.com');
        await page.fill('textarea[name="message"]', 'Hello');
        await page.click('button[type="submit"]');
        await expect(page.locator('[data-testid="success-message"]')).toBeVisible({ timeout: 10000 });
    });

    test('search functionality', async ({ page }) => {
        await page.goto('/');
        await page.click('[data-testid="search-button"]');
        await page.fill('input[type="search"]', 'Sénat');
        await page.press('input[type="search"]', 'Enter');
        await expect(page).toHaveURL(/\/search\?q=Sénat/);
        await expect(page.locator('h1:has-text("Résultats de recherche")')).toBeVisible();
        await expect(page.locator('[data-testid="search-results"]')).toBeVisible();
    });
});