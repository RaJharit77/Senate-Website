/// <reference types="cypress" />
/// <reference types="cypress-axe" />

describe('Tests d\'accessibilité', () => {
    beforeEach(() => {
        cy.injectAxe();
    });

    it('vérifie l\'accessibilité de la page d\'accueil', () => {
        cy.visit('/');
        cy.checkA11y();
    });

    it('vérifie l\'accessibilité de la page À propos', () => {
        cy.visit('/about');
        cy.checkA11y();
    });

    it('vérifie l\'accessibilité de la page Contact', () => {
        cy.visit('/contact');
        cy.checkA11y();
    });

    it('vérifie l\'accessibilité d\'une page d\'article (si existante)', () => {
        cy.visit('/');
        // Prendre le premier lien d'article et y naviguer
        cy.get('[data-testid="news-grid"] a').first().click();
        cy.url().should('match', /\/actualite\/.+/);
        cy.checkA11y();
    });

    // On peut aussi cibler des éléments spécifiques
    it('vérifie l\'accessibilité du formulaire de contact', () => {
        cy.visit('/contact');
        cy.checkA11y('form');
    });
});