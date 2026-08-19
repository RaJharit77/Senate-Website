/// <reference types="cypress" />

describe('Advanced Tests – API Mocking, Edge Cases, Structured Data', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/wp-json/wp/v2/pages?slug=nature-et-missions-2*', {
            fixture: 'page-missions.json',
        }).as('getMissions');
        cy.intercept('GET', '**/wp-json/wp/v2/posts*', { fixture: 'posts.json' }).as('getPosts');
    });

    it('shows 404 for non-existent route', () => {
        cy.visit('/non-existent-route', { failOnStatusCode: false });
        cy.get('h1').contains('Page non trouvée').should('be.visible');
        cy.get('a').contains("Retour à l'accueil").should('be.visible');
    });

    it('handles loading state for client-side components', () => {
        cy.visit('/historical');
        // Attendre que le contenu soit chargé
        cy.get('.bg-white\\/10, .prose, .flex.flex-wrap.gap-3.mb-10', { timeout: 15000 }).should('be.visible');
    });

    it('verifies JSON-LD structured data on homepage', () => {
        cy.visit('/');
        cy.wait(500);
        cy.get('script[type="application/ld+json"]').should('exist');
        cy.get('script[type="application/ld+json"]').then(($scripts) => {
            let found = false;
            for (let i = 0; i < $scripts.length; i++) {
                try {
                    const json = JSON.parse($scripts[i].innerHTML);
                    if (json['@type'] === 'WebPage' || json['@type'] === 'GovernmentOrganization') {
                        found = true;
                        break;
                    }
                } catch {
                    // ignore
                }
            }
            expect(found).to.equal(true);
        });
    });

    it('checks images have alt attributes', () => {
        cy.visit('/');
        cy.get('img').each(($img) => {
            cy.wrap($img).should('have.attr', 'alt').and('not.be.empty');
        });
    });

    it('tests the search API endpoint directly', () => {
        cy.request('/api/search?q=senat').then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
        });
    });
});