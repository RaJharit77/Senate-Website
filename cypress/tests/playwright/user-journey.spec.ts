import { test, expect } from '@playwright/test';

test.describe('User Journey Simulation', () => {
    test('full visitor session', async ({ page }) => {
        // Home
        await page.goto('/');
        await expect(page.locator('[data-testid="hero-carousel"]')).toBeVisible();

        // Click first news article
        const firstNews = page.locator('[data-testid="news-grid"] a').first();
        await firstNews.click();
        await expect(page).toHaveURL(/\/actualite\/.+/);
        await page.goBack();

        // About
        await page.click('nav a:has-text("À propos du Sénat")');
        await expect(page).toHaveURL(/\/about/);

        // Structures
        await page.click('a:has-text("Structures")');
        await expect(page).toHaveURL(/\/about\/structures/);

        // Search
        await page.click('[data-testid="search-button"]');
        await page.fill('input[type="search"]', 'loi');
        await page.press('input[type="search"]', 'Enter');
        await expect(page).toHaveURL(/\/search\?q=loi/);
        const firstResult = page.locator('[data-testid="search-results"] a').first();
        await firstResult.click();
        await expect(page).not.toHaveURL(/\/search/);

        // Press Area
        await page.click('nav a:has-text("Espace Presse")');
        await expect(page).toHaveURL(/\/press-area/);

        // Footer link
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.click('footer a:has-text("Historique")');
        await expect(page).toHaveURL(/\/historical/);

        // Chatbot
        await page.click('[data-testid="chatbot-toggle"]');
        await expect(page.locator('[data-testid="chatbot-window"]')).toBeVisible();
        await page.fill('textarea', 'Bonjour');
        await page.press('textarea', 'Enter');
        // Wait for response (at least one assistant message)
        await expect(page.locator('[data-testid="chatbot-messages"] .message')).toHaveCount(2, { timeout: 15000 });
    });
});