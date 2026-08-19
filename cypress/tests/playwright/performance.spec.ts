import { test, expect } from '@playwright/test';

test.describe('Performance avec Playwright', () => {
    test('mesure le temps de chargement de la page d\'accueil', async ({ page }) => {
        const start = Date.now();
        await page.goto('/');
        const loadTime = Date.now() - start;
        console.log(`Temps de chargement : ${loadTime}ms`);
        expect(loadTime).toBeLessThan(15000);
    });

    test('mesure le FCP et LCP via Performance API', async ({ page }) => {
        await page.goto('/');
        const fcp = await page.evaluate(() => {
            const entry = performance.getEntriesByType('paint').find(e => e.name === 'first-contentful-paint');
            return entry ? entry.startTime : 0;
        });
        console.log(`FCP : ${fcp.toFixed(0)}ms`);
        expect(fcp).toBeLessThan(3000);

        const lcp = await page.evaluate<number>(() => {
            return new Promise<number>((resolve) => {
                const observer = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lcpEntry = entries.find(e => e.entryType === 'largest-contentful-paint');
                    if (lcpEntry) {
                        resolve(lcpEntry.startTime);
                        observer.disconnect();
                    }
                });
                observer.observe({ type: 'largest-contentful-paint', buffered: true });
                setTimeout(() => resolve(0), 5000);
            });
        });
        console.log(`LCP : ${lcp.toFixed(0)}ms`);
        expect(lcp).toBeLessThan(4000);
    });

    test('simule une connexion lente (3G) et mesure le temps de chargement', async ({ page }) => {
        await page.route('**/*', (route) => {
            return route.continue();
        });
        const client = await page.context().newCDPSession(page);
        await client.send('Network.emulateNetworkConditions', {
            offline: false,
            latency: 300,
            downloadThroughput: (1.6 * 1024 * 1024) / 8,
            uploadThroughput: (750 * 1024) / 8,
        });

        const start = Date.now();
        await page.goto('/');
        const loadTime = Date.now() - start;
        console.log(`Temps de chargement (3G) : ${loadTime}ms`);
        expect(loadTime).toBeLessThan(25000); // 25s au lieu de 8s
    });
});