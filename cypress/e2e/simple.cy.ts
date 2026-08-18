/// <reference types="cypress" />

describe('Simple Tests – Core Pages & Navigation', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('loads homepage with main sections', () => {
        cy.checkLayout();
        // Carousel principal
        cy.get('section.relative.overflow-hidden').should('exist');
        // Grille d'actualités
        cy.get('.grid, [class*="news"]').should('exist');
        // Titre "À propos du Sénat"
        cy.get('h2, h1').contains('À propos du Sénat').should('exist');
        // Titre "Travaux Parlementaires" (dans le paragraphe)
        cy.get('p:has-text("Travaux Parlementaires")').should('exist');
        // Bande de partenaires
        cy.get('[class*="partner"], .flex.gap-4 img').should('exist');
    });

    it('navigates to About and its subpages', () => {
        cy.contains('nav a', 'À propos du Sénat').click();
        cy.url().should('include', '/about');
        cy.get('h1').contains('À propos du Sénat').should('be.visible');

        cy.get('a').contains('Missions et attributions').click();
        cy.url().should('include', '/about/missions-and-responsibilities');
        cy.get('h1').contains('Missions et attributions').should('be.visible');

        cy.go('back');
        cy.get('a').contains('Structures').click();
        cy.url().should('include', '/about/structures');
        cy.get('h1').contains('Structures du Sénat').should('be.visible');
    });

    it('loads Contact page with form', () => {
        cy.get('nav a').contains('Contact').click();
        cy.url().should('include', '/contact');
        cy.get('h1').contains('Contact').should('be.visible');
        cy.get('form').should('exist');
        cy.get('input[name="name"]').should('exist');
    });

    it('loads Historical page', () => {
        cy.get('nav a').contains('Historique').click();
        cy.url().should('include', '/historical');
        cy.get('h1').contains('Histoire du Sénat').should('be.visible');
        // Les onglets sont des boutons dans une div flex
        cy.get('.flex.flex-wrap.gap-3.mb-10 button').should('exist');
    });
});