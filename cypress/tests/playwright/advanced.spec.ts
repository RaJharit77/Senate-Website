import { test, expect } from '@playwright/test';

test.describe('Advanced Tests', () => {
    test('404 page', async ({ page }) => {
        const response = await page.goto('/non-existent-route');
        expect(response?.status()).toBe(404);
        await expect(page.locator('h1:has-text("Page non trouvée")')).toBeVisible();
    });

    test('structured data JSON-LD', async ({ page }) => {
        await page.goto('/');
        const scripts = await page.locator('script[type="application/ld+json"]').all();
        expect(scripts.length).toBeGreaterThan(0);
        const json = JSON.parse(await scripts[0].textContent() || '{}');
        expect(json['@type']).toBeDefined();
    });

    test('API search endpoint', async ({ request }) => {
        const response = await request.get('/api/search?q=senat');
        expect(response.ok()).toBeTruthy();
        const data = await response.json();
        expect(Array.isArray(data)).toBeTruthy();
    });
});