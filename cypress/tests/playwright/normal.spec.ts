import { test, expect } from '@playwright/test';

test('contact form submission', async ({ page }) => {
    await page.goto('/contact');
    await page.click('button[type="submit"]');
    // Attendre un message d'erreur avec la classe text-red-400
    await expect(page.locator('.text-red-400')).toBeVisible({ timeout: 5000 });

    await page.fill('input[name="name"]', 'Jane Doe');
    await page.fill('input[name="email"]', 'jane@example.com');
    await page.fill('textarea[name="message"]', 'Hello');
    await page.click('button[type="submit"]');
    await expect(page.locator('.text-green-400')).toBeVisible({ timeout: 10000 });
});

test('search functionality', async ({ page }) => {
    await page.goto('/');
    // Cliquer sur le bouton "Rechercher…" en utilisant getByRole avec le texte exact
    await page.getByRole('button', { name: 'Rechercher…' }).click();
    // Attendre que l'input de recherche soit visible
    await page.locator('input[type="search"]').waitFor({ state: 'visible' });
    await page.fill('input[type="search"]', 'Sénat');
    await page.press('input[type="search"]', 'Enter');
    await expect(page).toHaveURL(/\/search\?q=Sénat/);
    await expect(page.locator('h1:has-text("Résultats de recherche")')).toBeVisible();
    await expect(page.locator('[class*="result"]')).toBeVisible();
});