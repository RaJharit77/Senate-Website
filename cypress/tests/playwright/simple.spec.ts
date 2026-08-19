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
        await page.goto('/about');

        await expect(page.getByRole('heading', { name: 'À propos du Sénat', level: 1 }).first()).toBeVisible();

        await page.goto('/about/structures');
        await expect(page.locator('h1:has-text("Structures du Sénat")')).toBeVisible();
    });
});