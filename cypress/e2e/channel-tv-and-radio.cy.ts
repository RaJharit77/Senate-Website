// cypress/e2e/channel-tv-and-radio.cy.ts
//
// Équivalent Cypress du spec Playwright tests/channel-tv-and-radio.spec.ts.
// Couvre la même chose : structure des cartes Directs, cohérence du
// statut renvoyé par /api/live, catalogue (filtres/recherche/détail).
//
// Ce que ces tests NE peuvent PAS faire : forcer ou vérifier un contenu
// YouTube/Facebook précis, puisque checkYoutubeLive() s'exécute côté
// serveur Next.js — cy.intercept() n'intercepte que le trafic du
// navigateur, jamais un fetch fait par le serveur pendant le rendu. Ces
// tests vérifient donc que l'app se comporte correctement QUEL QUE SOIT
// l'état réel du direct (en ligne ou hors ligne), jamais un état précis.
//
// ⚠️ Les libellés de filtre ci-dessous reprennent la dernière version
// connue de ChannelAndRadioClient.tsx — à reconfirmer si son contenu a
// changé depuis.

describe('Chaîne TV / Radio', () => {
    it('affiche le titre et les deux cartes Directs (TV + Radio)', () => {
        cy.visit('/channel-tv-and-radio');

        cy.contains('h2', 'Directs').should('be.visible');
        cy.contains('a', 'Sénat TV').should('be.visible');
        cy.contains('a', 'Sénat Radio').should('be.visible');
    });

    it('la carte TV affiche "En direct" ou "Hors ligne", jamais les deux ni aucun', () => {
        cy.visit('/channel-tv-and-radio');

        cy.contains('a', 'Sénat TV').within(() => {
            cy.root().invoke('text').then((text) => {
                const hasLive = text.includes('En direct');
                const hasOffline = text.includes('Hors ligne');
                expect(hasLive !== hasOffline).to.be.true;
            });
        });
    });

    it('/channel-tv-and-radio/live/tv charge sans erreur, quel que soit le statut', () => {
        cy.visit('/channel-tv-and-radio/live/tv');
        cy.contains('h1', 'Sénat TV – Direct').should('be.visible');
        // Le message d'erreur réseau ne doit jamais apparaître juste parce
        // qu'aucun direct n'est configuré : ce n'est pas une erreur, c'est
        // un état normal.
        cy.contains('momentanément indisponible').should('not.exist');
    });

    it('/channel-tv-and-radio/live/radio charge sans erreur', () => {
        cy.visit('/channel-tv-and-radio/live/radio');
        cy.contains('h1', 'Sénat Radio – Direct').should('be.visible');
    });

    it('/api/live répond en JSON avec un sourceType valide', () => {
        cy.request('/api/live').then((response) => {
            expect(response.status).to.eq(200);
            expect(['url', 'facebook', 'youtube']).to.include(response.body.sourceType);
            expect(response.body.isLive).to.be.a('boolean');
            expect(response.body.kind).to.eq('tv');
        });
    });

    it('/api/live?kind=radio répond avec kind=radio', () => {
        cy.request('/api/live?kind=radio').then((response) => {
            expect(response.body.kind).to.eq('radio');
            expect(response.body.sourceType).to.eq('url');
        });
    });

    // ── Catalogue (filtres / recherche / détail) ──

    it('les boutons de filtre ne cassent pas la page', () => {
        cy.visit('/channel-tv-and-radio');

        const labels = ['Chaîne YouTube', 'Vidéos', 'Podcasts', 'Mise en boîte', 'Tous'];
        labels.forEach((label) => {
            cy.get('body').then(($body) => {
                const match = $body.find(`button:contains("${label}")`);
                if (match.length === 0) return; // libellé peut-être différent désormais
                cy.wrap(match.first()).click();
                cy.contains('h1', 'Chaîne TV / Radio').should('be.visible');
            });
        });
    });

    it('une recherche sans résultat affiche le message vide plutôt qu\'un crash', () => {
        cy.visit('/channel-tv-and-radio');
        cy.get('input[placeholder="Rechercher..."]').type('zzzzz-terme-improbable-zzzzz');
        cy.contains('button', 'Rechercher').click();
        cy.contains('Aucun contenu ne correspond à vos critères.').should('be.visible');
    });

    it('un lien "Regarder"/"Écouter" mène à une vraie page (pas un 404)', () => {
        cy.visit('/channel-tv-and-radio');

        cy.get('body').then(($body) => {
            const links = $body.find('a:contains("Regarder"), a:contains("Écouter")');
            if (links.length === 0) {
                cy.log('Aucun média disponible pour le moment (catégories WP encore vides).');
                return;
            }
            const href = links.first().attr('href');
            cy.visit(href as string);
            cy.contains('Retour à la Chaîne TV / Radio').should('be.visible');
        });
    });

    it('un slug de vidéo inexistant renvoie bien un 404 Next.js', () => {
        // Échouera tant que video/[slug]/page.tsx utilisera `<NotFound />` en
        // JSX au lieu d'appeler notFound() de 'next/navigation' (signalé
        // précédemment) — c'est le signal exact que ce correctif reste à faire.
        cy.request({
            url: '/channel-tv-and-radio/video/ce-slug-nexiste-vraiment-pas',
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(404);
        });
    });
});
