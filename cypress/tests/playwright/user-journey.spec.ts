import { test, expect } from '@playwright/test';

test.describe('User Journey Simulation', () => {
    test('full visitor session', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('section.relative.overflow-hidden')).toBeVisible();

        const firstNews = page.locator('.grid a, .card a').first();
        await firstNews.click();
        await expect(page).toHaveURL(/\/actualite\/.+/);
        await page.goBack();

        // Navigation À propos
        await page.getByRole('link', { name: 'À propos du Sénat' }).hover();
        await page.getByRole('link', { name: 'Missions et attributions' }).click();
        await expect(page).toHaveURL(/\/about/);

        // Recherche
        await page.getByRole('button', { name: 'Rechercher…' }).click();
        const searchInput = page.getByTestId('search-input').first();
        await searchInput.waitFor({ state: 'visible' });
        await searchInput.fill('loi');
        await searchInput.press('Enter');
        await expect(page).toHaveURL(/\/search\?q=loi/);
        const firstResult = page.locator('.grid a, .card a').first();
        await firstResult.click();
        await expect(page).not.toHaveURL(/\/search/);

        // Espace Presse
        await page.getByRole('navigation').getByRole('link', { name: 'Espace Presse' }).click();
        await expect(page).toHaveURL(/\/press-area/);

        // Historique
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.getByRole('navigation').getByRole('link', { name: 'Historique' }).click();
        await expect(page).toHaveURL(/\/historical/);

        // Chatbot
        await page.click('button.fixed.bottom-4.right-4');
        await expect(page.locator('.fixed.bottom-20, [class*="chatbot-window"]')).toBeVisible();
        // Le champ est un input, pas textarea
        const chatInput = page.locator('input[placeholder*="question"], input[placeholder*="Posez"]');
        await chatInput.fill('Bonjour');
        await chatInput.press('Enter');
        await expect(page.locator('.overflow-y-auto .flex')).toHaveCount(3, { timeout: 15000 });
    });
});