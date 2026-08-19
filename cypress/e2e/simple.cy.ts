/// <reference types="cypress" />

describe('Simple Tests – Core Pages & Navigation', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('header', { timeout: 10000 }).should('be.visible');
    });

    it('loads homepage with main sections', () => {
        cy.checkLayout();
        cy.get('section.relative.overflow-hidden').should('exist');
        cy.get('.grid, [class*="news"]').should('exist');
        cy.get('h2, h1').contains('À propos du Sénat').should('exist');
        cy.contains('p', 'Travaux Parlementaires').should('exist');
        cy.get('[class*="partner"], .flex.gap-4 img').should('exist');
    });

    it('navigates to About and its subpages', () => {
        // Déclencher le survol (ou le clic) pour ouvrir le menu déroulant
        cy.contains('À propos du Sénat').trigger('mouseover');

        // Cliquer sur le premier sous-lien qui mène à la page À propos
        cy.contains('Missions et attributions').click();

        // Vérification de la navigation
        cy.url().should('include', '/about');
        cy.contains('Missions et attributions').should('exist');
        cy.contains('Structures').should('exist');
        cy.contains('Textes de référence').should('exist');
    });

    it('loads Contact page with form', () => {
        cy.get('a').contains('Contact').click();
        cy.url().should('include', '/contact');
        cy.get('h1').contains('Contact').should('be.visible');
        cy.get('form').should('exist');
        cy.get('[data-testid="contact-name"], input[name="name"]').should('exist');
    });

    it('loads Historical page', () => {
        cy.get('a').contains('Historique').click();
        cy.url().should('include', '/historical');
        cy.get('h1').contains('Histoire du Sénat').should('be.visible');
        cy.get('.flex.flex-wrap.gap-3.mb-10 button').should('exist');
    });
});