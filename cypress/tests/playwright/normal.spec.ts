import { test, expect } from '@playwright/test';

test('contact form submission', async ({ page }) => {
    await page.route('**/wp-json/contact-form-7/v1/contact-forms/*/feedback', async (route) => {
        await route.fulfill({
            status: 200,
            body: JSON.stringify({ status: 'mail_sent', message: 'Votre message a bien été envoyé.' })
        });
    });

    await page.goto('/contact');
    await page.addStyleTag({ content: 'nextjs-portal { display: none !important; }' });

    await page.click('button[type="submit"]');
    const isFormValid = await page.locator('form').evaluate((form: HTMLFormElement) => form.checkValidity());
    expect(isFormValid).toBe(false);

    await page.fill('input[name="name"]', 'Jane Doe');
    await page.fill('input[name="email"]', 'jane@example.com');
    await page.fill('textarea[name="message"]', 'Hello');

    const isFormValidAfterFill = await page.locator('form').evaluate((form: HTMLFormElement) => form.checkValidity());
    expect(isFormValidAfterFill).toBe(true);

    await page.click('button[type="submit"]');
    await expect(page.getByText('Votre message a bien été envoyé.')).toBeVisible({ timeout: 10000 });
});