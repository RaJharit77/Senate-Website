import { test, expect } from '@playwright/test';

test.describe('Performance avec Playwright', () => {
    test('mesure le temps de chargement de la page d\'accueil', async ({ page }) => {
        const start = Date.now();
        await page.goto('/');
        const loadTime = Date.now() - start;
        console.log(`Temps de chargement : ${loadTime}ms`);
        expect(loadTime).toBeLessThan(3000);
    });

    test('mesure le FCP et LCP via Performance API', async ({ page }) => {
        await page.goto('/');
        const fcp = await page.evaluate(() => {
            const entry = performance.getEntriesByType('paint').find(e => e.name === 'first-contentful-paint');
            return entry ? entry.startTime : 0;
        });
        console.log(`FCP : ${fcp.toFixed(0)}ms`);
        expect(fcp).toBeLessThan(2000);

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
                // Fallback après 5 secondes
                setTimeout(() => resolve(0), 5000);
            });
        });
        console.log(`LCP : ${lcp.toFixed(0)}ms`);
        expect(lcp).toBeLessThan(2500);
    });

    test('simule une connexion lente (3G) et mesure le temps de chargement', async ({ page }) => {
        // Playwright permet de simuler le réseau
        await page.route('**/*', (route) => {
            // On peut retarder les requêtes
            return route.continue();
        });
        // Utiliser la fonction de throttling
        const client = await page.context().newCDPSession(page);
        await client.send('Network.emulateNetworkConditions', {
            offline: false,
            latency: 300, // ms
            downloadThroughput: (1.6 * 1024 * 1024) / 8, // 1.6 Mbps
            uploadThroughput: (750 * 1024) / 8, // 750 Kbps
        });

        const start = Date.now();
        await page.goto('/');
        const loadTime = Date.now() - start;
        console.log(`Temps de chargement (3G) : ${loadTime}ms`);
        expect(loadTime).toBeLessThan(5000);
    });
});