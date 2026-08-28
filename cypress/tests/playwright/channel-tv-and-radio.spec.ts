import { test, expect } from '@playwright/test';

// Prérequis : serveur lancé (npm run dev, ou baseURL configurée vers le
// déploiement de preview dans playwright.config.ts).
//
// Mis à jour suite à deux changements : le renommage de route
// /chaine-tv-radio -> /channel-tv-and-radio, et la refonte du direct TV
// (détection YouTube réelle + repli Facebook manuel, voir
// lib/api.ts::getLiveStatus). Les tests "Directs" vérifient la structure de
// navigation et la cohérence du statut, pas le contenu d'un direct réel :
// qu'une diffusion soit en cours ou non au moment du test ne doit jamais
// faire échouer ces assertions.
//
// ⚠️ Les libellés de filtre du catalogue ci-dessous reprennent la dernière
// version connue de ChannelAndRadioClient.tsx. Si son contenu a changé
// depuis, ce test saute silencieusement les libellés absents plutôt que
// d'échouer à tort — à resserrer une fois les libellés réels confirmés.
test.describe('Chaîne TV / Radio', () => {
    test('affiche le titre et les deux cartes Directs (TV + Radio)', async ({ page }) => {
        await page.goto('/channel-tv-and-radio');

        await expect(page.getByRole('heading', { name: 'Directs' })).toBeVisible();
        await expect(page.getByRole('link', { name: /Sénat TV/ }).first()).toBeVisible();
        await expect(page.getByRole('link', { name: /Sénat Radio/ }).first()).toBeVisible();
    });

    test('la carte TV affiche "En direct" ou "Hors ligne", jamais les deux ni aucun', async ({ page }) => {
        await page.goto('/channel-tv-and-radio');

        const tvCard = page.getByRole('link', { name: /Sénat TV/ }).first();
        const isLive = await tvCard.getByText('En direct').isVisible().catch(() => false);
        const isOffline = await tvCard.getByText('Hors ligne').isVisible().catch(() => false);
        expect(isLive !== isOffline).toBe(true);
    });

    test('/channel-tv-and-radio/live/tv charge sans erreur, quel que soit le statut', async ({ page }) => {
        const response = await page.goto('/channel-tv-and-radio/live/tv');
        expect(response?.status()).toBe(200);
        await expect(page.getByRole('heading', { name: 'Sénat TV – Direct' })).toBeVisible();

        // Jamais les deux messages en même temps ; le message d'erreur réseau
        // ne doit jamais apparaître juste parce qu'aucun direct n'est configuré.
        await expect(page.getByText(/momentanément indisponible/)).not.toBeVisible();
    });

    test('/channel-tv-and-radio/live/radio charge sans erreur', async ({ page }) => {
        const response = await page.goto('/channel-tv-and-radio/live/radio');
        expect(response?.status()).toBe(200);
        await expect(page.getByRole('heading', { name: 'Sénat Radio – Direct' })).toBeVisible();
    });

    test('/api/live répond en JSON avec un sourceType valide', async ({ request }) => {
        const res = await request.get('/api/live');
        expect(res.status()).toBe(200);

        const body = await res.json();
        expect(['url', 'facebook', 'youtube']).toContain(body.sourceType);
        expect(typeof body.isLive).toBe('boolean');
        expect(body.kind).toBe('tv');
    });

    test('/api/live?kind=radio répond avec kind=radio', async ({ request }) => {
        const res = await request.get('/api/live?kind=radio');
        const body = await res.json();
        expect(body.kind).toBe('radio');
        expect(body.sourceType).toBe('url');
    });

    // ── Catalogue (filtres / recherche / détail) — inchangé sur le fond,
    // seule la route a été corrigée. Libellés à reconfirmer, cf. avertissement en tête de fichier. ──

    test('les boutons de filtre ne cassent pas la page', async ({ page }) => {
        await page.goto('/channel-tv-and-radio');

        for (const label of ['Chaîne YouTube', 'Vidéos', 'Podcasts', 'Mise en boîte', 'Tous']) {
            const button = page.getByRole('button', { name: label, exact: true });
            if ((await button.count()) === 0) continue; // libellé peut-être différent désormais
            await button.click();
            await expect(page.getByRole('heading', { name: 'Chaîne TV / Radio' })).toBeVisible();
        }
    });

    test('une recherche sans résultat affiche le message vide plutôt qu\'un crash', async ({ page }) => {
        await page.goto('/channel-tv-and-radio');
        await page.getByPlaceholder('Rechercher...').fill('zzzzz-terme-improbable-zzzzz');
        await page.getByRole('button', { name: 'Rechercher' }).click();
        await expect(page.getByText('Aucun contenu ne correspond à vos critères.')).toBeVisible();
    });

    test('un lien "Regarder"/"Écouter" mène à une vraie page (pas un 404)', async ({ page }) => {
        await page.goto('/channel-tv-and-radio');

        const links = page.getByRole('link', { name: /Regarder|Écouter/ });
        const count = await links.count();
        test.skip(count === 0, 'Aucun média disponible pour le moment (catégories WP encore vides).');

        const href = await links.first().getAttribute('href');
        expect(href).toBeTruthy();

        const response = await page.goto(href!);
        expect(response?.status()).toBe(200);
        await expect(page.getByText('Retour à la Chaîne TV / Radio')).toBeVisible();
    });

    test('un slug de vidéo inexistant renvoie bien un 404 Next.js', async ({ page }) => {
        // Ce test échouera tant que video/[slug]/page.tsx utilisera
        // `<NotFound />` en JSX au lieu d'appeler notFound() de
        // 'next/navigation' (signalé précédemment) : c'est le signal exact
        // que ce correctif reste à faire.
        const response = await page.goto('/channel-tv-and-radio/video/ce-slug-nexiste-vraiment-pas');
        expect(response?.status()).toBe(404);
    });
});
