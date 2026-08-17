import { test, expect } from '@playwright/test';

test.describe('Régression visuelle', () => {
    test('comparer la page d\'accueil avec une référence', async ({ page }) => {
        await page.goto('/');
        // Prendre une capture d'écran et la comparer avec une image de référence
        // Nécessite de générer d'abord l'image de référence avec `--update-snapshots`
        await expect(page).toHaveScreenshot('homepage.png', { fullPage: true, maxDiffPixelRatio: 0.1 });
    });

    test('comparer la page À propos', async ({ page }) => {
        await page.goto('/about');
        await expect(page).toHaveScreenshot('about.png', { fullPage: true, maxDiffPixelRatio: 0.1 });
    });

    test('comparer la page Contact (formulaire)', async ({ page }) => {
        await page.goto('/contact');
        // On peut capturer uniquement le formulaire
        const form = page.locator('form');
        await expect(form).toHaveScreenshot('contact-form.png');
    });
});