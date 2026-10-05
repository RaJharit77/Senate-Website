import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pagesToTest = [
    { name: 'Accueil', path: '/' },
    { name: 'À propos', path: '/about' },
    { name: 'Contact', path: '/contact' },
];

for (const { name, path } of pagesToTest) {
    test(`Accessibilité – ${name}`, async ({ page }) => {
        await page.goto(path);

        const results = await new AxeBuilder({ page })
            .withTags(['wcag2a'])
            .disableRules(['color-contrast', 'page-has-heading-one', 'region'])
            .analyze();

        expect(results.violations).toEqual([]);
    });
}

test('Accessibilité – Formulaire de contact', async ({ page }) => {
    await page.goto('/contact');
    const results = await new AxeBuilder({ page })
        .include('form')
        .withTags(['wcag2a'])
        .disableRules(['color-contrast'])
        .analyze();
    expect(results.violations).toEqual([]);
});