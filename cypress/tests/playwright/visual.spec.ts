import { test, expect } from '@playwright/test';

test.describe('Régression visuelle', () => {
    test('comparer la page d\'accueil avec une référence', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveScreenshot('homepage.png', { fullPage: true, maxDiffPixelRatio: 0.1 });
    });

    test('comparer la page À propos', async ({ page }) => {
        await page.goto('/about');
        await expect(page).toHaveScreenshot('about.png', { fullPage: true, maxDiffPixelRatio: 0.1 });
    });

    test('comparer la page Contact (formulaire)', async ({ page }) => {
        await page.goto('/contact');
        const form = page.locator('form');
        await expect(form).toHaveScreenshot('contact-form.png');
    });

    test('comparer la page Historique', async ({ page }) => {
        await page.goto('/historical');
        await expect(page).toHaveScreenshot('historical.png', { fullPage: true, maxDiffPixelRatio: 0.1 });
    });
});

test.skip(!!process.env.CI, 'Visual tests only run locally');