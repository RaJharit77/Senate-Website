import { test, expect } from '@playwright/test';

test.describe('User Journey Simulation', () => {
    test('full visitor session', async ({ page }) => {
        // Home
        await page.goto('/');
        await expect(page.locator('section.relative.overflow-hidden')).toBeVisible();

        // Click first news article
        const firstNews = page.locator('.grid a, .card a').first();
        await firstNews.click();
        await expect(page).toHaveURL(/\/actualite\/.+/);
        await page.goBack();

        // About
        await page.getByRole('link', { name: 'À propos du Sénat' }).click();
        await expect(page).toHaveURL(/\/about/);

        // Structures
        await page.getByRole('link', { name: 'Structures' }).click();
        await expect(page).toHaveURL(/\/about\/structures/);

        // Search
        await page.getByRole('button', { name: 'Rechercher…' }).click();
        await page.locator('input[type="search"]').waitFor({ state: 'visible' });
        await page.fill('input[type="search"]', 'loi');
        await page.press('input[type="search"]', 'Enter');
        await expect(page).toHaveURL(/\/search\?q=loi/);
        const firstResult = page.locator('[class*="result"] a').first();
        await firstResult.click();
        await expect(page).not.toHaveURL(/\/search/);

        // Press Area
        await page.getByRole('link', { name: 'Espace Presse' }).click();
        await expect(page).toHaveURL(/\/press-area/);

        // Footer link
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.getByRole('link', { name: 'Historique' }).click();
        await expect(page).toHaveURL(/\/historical/);

        // Chatbot
        await page.click('button.fixed.bottom-4.right-4');
        await expect(page.locator('.fixed.bottom-20, [class*="chatbot-window"]')).toBeVisible();
        await page.fill('textarea', 'Bonjour');
        await page.press('textarea', 'Enter');
        await expect(page.locator('.message, [class*="message"]')).toHaveCount(2, { timeout: 15000 });
    });
});