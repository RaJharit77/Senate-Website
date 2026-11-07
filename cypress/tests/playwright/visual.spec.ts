import { test, expect, type Page } from '@playwright/test';

interface PagePreparer {
    (page: Page): Promise<void>;
}

test.describe('Régression visuelle', () => {
    const preparePage: PagePreparer = async (page: Page): Promise<void> => {
        await page.waitForLoadState('networkidle');
        await page.addStyleTag({ content: 'nextjs-portal { display: none !important; }' });
    };

    test('comparer la page d\'accueil avec une référence', async ({ page }) => {
        await page.goto('/');
        await preparePage(page);

        await expect(page).toHaveScreenshot('homepage.png', {
            fullPage: true,
            maxDiffPixelRatio: 0.1,
            animations: 'disabled',
            timeout: 15000, // <-- AJOUT : Timeout augmenté pour la page d'accueil
            mask: [page.locator('button').filter({ hasText: /\d{2}:\d{2}/ })]
        });
    });

    test('comparer la page À propos', async ({ page }) => {
        await page.goto('/about');
        await preparePage(page);
        await expect(page).toHaveScreenshot('about.png', {
            fullPage: true,
            maxDiffPixelRatio: 0.1,
            timeout: 15000
        });
    });

    test('comparer la page Contact (formulaire)', async ({ page }) => {
        await page.goto('/contact');
        await preparePage(page);
        const form = page.locator('form');
        await expect(form).toHaveScreenshot('contact-form.png', {
            maxDiffPixelRatio: 0.05
        });
    });

    test('comparer la page Historique', async ({ page }) => {
        await page.goto('/historical');
        await preparePage(page);

        await page.waitForTimeout(1000);

        await expect(page).toHaveScreenshot('historical.png', {
            fullPage: true,
            maxDiffPixelRatio: 0.1,
            timeout: 15000,
            mask: [page.locator('button').filter({ hasText: /\d{2}:\d{2}/ })]
        });
    });
});

test.skip(!!process.env.CI, 'Visual tests only run locally');