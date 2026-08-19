import { test, expect } from '@playwright/test';

test('contact form submission', async ({ page }) => {
    await page.route('**/wp-json/contact-form-7/v1/contact-forms/*/feedback', async (route) => {
        await route.fulfill({
            status: 200,
            body: JSON.stringify({ status: 'mail_sent', message: 'Votre message a bien été envoyé.' })
        });
    });

    await page.goto('/contact');
    await page.click('button[type="submit"]');
    await expect(page.locator('[class*="text-red"], [class*="error"]')).toBeVisible({ timeout: 5000 });

    await page.fill('input[name="name"]', 'Jane Doe');
    await page.fill('input[name="email"]', 'jane@example.com');
    await page.fill('textarea[name="message"]', 'Hello');
    await page.click('button[type="submit"]');

    await expect(page.locator('[class*="text-green"]')).toBeVisible({ timeout: 10000 });
});

test('search functionality', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Rechercher…' }).click();
    const searchInput = page.getByTestId('search-input').first();
    await searchInput.waitFor({ state: 'visible', timeout: 10000 });
    await searchInput.fill('Sénat');
    await searchInput.press('Enter');
    await expect(page).toHaveURL(/\/search/);
    await expect(page.locator('h1:has-text("Résultats de recherche")')).toBeVisible();
    await expect(page.locator('.grid a, .card a').first()).toBeVisible();
});