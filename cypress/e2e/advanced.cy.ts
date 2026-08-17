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
        // Si un spinner existe, il peut avoir une classe comme .animate-spin
        cy.get('.animate-spin, [class*="spinner"]', { timeout: 2000 }).should('exist');
        cy.get('.bg-white\\/10, .prose', { timeout: 10000 }).should('be.visible');
    });

    it('verifies JSON-LD structured data on homepage', () => {
        cy.visit('/');
        cy.get('script[type="application/ld+json"]').should('exist');
        cy.get('script[type="application/ld+json"]').then(($scripts) => {
            const json = JSON.parse($scripts[0].innerHTML);
            expect(json['@type']).to.be.oneOf(['WebPage', 'GovernmentOrganization']);
        });
    });

    it('checks images have alt attributes', () => {
        cy.visit('/');
        cy.get('img').each(($img) => {
            // ensure images have a non-empty alt attribute
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