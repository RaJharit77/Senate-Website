import { test, expect } from '@playwright/test';

test.describe('Simple Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('homepage loads', async ({ page }) => {
        await expect(page.locator('header')).toBeVisible();
        await expect(page.locator('footer')).toBeVisible();
        await expect(page.locator('main')).toBeVisible();
        await expect(page.locator('section.relative.overflow-hidden')).toBeVisible();
    });

    test('navigate to About and subpages', async ({ page }) => {
        await page.goto('/');

        await page.getByRole('link', { name: 'À propos du Sénat' }).click();
        await expect(page).toHaveURL(/\/about$/);
        await expect(page.locator('h1').first()).toBeVisible();

        await page.getByRole('link', { name: 'Missions et attributions' }).click();
        await expect(page).toHaveURL(/\/about\/missions?-and-responsibilities/);
        await expect(page.locator('h1').first()).toBeVisible();

        await page.goto('/about/structures');
        await expect(page.locator('h1').first()).toBeVisible();
    });
});