/// <reference types="cypress" />
/// <reference types="cypress-axe" />

describe('Tests d\'accessibilité', () => {
    const shouldRun = Cypress.env('CI') === 'true';
    const testFn = shouldRun ? it : it.skip;

    beforeEach(() => {
        cy.injectAxe();
    });

    testFn('vérifie l\'accessibilité de la page d\'accueil', () => {
        cy.visit('/');
        cy.checkA11y();
    });

    testFn('vérifie l\'accessibilité de la page À propos', () => {
        cy.visit('/about');
        cy.checkA11y();
    });

    testFn('vérifie l\'accessibilité de la page Contact', () => {
        cy.visit('/contact');
        cy.checkA11y();
    });

    testFn('vérifie l\'accessibilité d\'une page d\'article (si existante)', () => {
        cy.visit('/');
        cy.get('[data-testid="news-grid"] a').first().click();
        cy.url().should('match', /\/actualite\/.+/);
        cy.checkA11y();
    });

    testFn('vérifie l\'accessibilité du formulaire de contact', () => {
        cy.visit('/contact');
        cy.checkA11y('form');
    });
});