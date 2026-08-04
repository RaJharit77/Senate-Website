import { test, expect } from '@playwright/test';

test.describe('Simple Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('homepage loads', async ({ page }) => {
        await expect(page.locator('header')).toBeVisible();
        await expect(page.locator('footer')).toBeVisible();
        await expect(page.locator('main')).toBeVisible();
        await expect(page.locator('[data-testid="hero-carousel"]')).toBeVisible();
    });

    test('navigate to About and subpages', async ({ page }) => {
        await page.click('nav a:has-text("À propos du Sénat")');
        await expect(page).toHaveURL(/\/about/);
        await expect(page.locator('h1:has-text("À propos du Sénat")')).toBeVisible();

        await page.click('a:has-text("Missions et attributions")');
        await expect(page).toHaveURL(/\/about\/missions-and-responsibilities/);
        await expect(page.locator('h1:has-text("Missions et attributions")')).toBeVisible();

        await page.goBack();
        await page.click('a:has-text("Structures")');
        await expect(page).toHaveURL(/\/about\/structures/);
        await expect(page.locator('h1:has-text("Structures du Sénat")')).toBeVisible();
    });
});