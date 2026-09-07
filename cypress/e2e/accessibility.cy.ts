/// <reference types="cypress" />
/// <reference types="cypress-axe" />

describe('Tests d\'accessibilité', () => {
    before(() => {
        // Désactiver les screenshots sur échec pour éviter le timeout
        Cypress.config('screenshotOnRunFailure', false);
    });

    after(() => {
        // Remettre la config par défaut
        Cypress.config('screenshotOnRunFailure', true);
    });

    beforeEach(() => {
        cy.injectAxe();
    });

    const axeOptions = {
        runOnly: {
            type: 'tag' as const,
            values: ['wcag2aa', 'wcag21aa'],
        },
    };

    it('vérifie l\'accessibilité de la page d\'accueil', () => {
        cy.visit('/');
        cy.checkA11y(undefined, axeOptions);
    });

    it('vérifie l\'accessibilité de la page À propos', () => {
        cy.visit('/about');
        cy.checkA11y(undefined, axeOptions);
    });

    it('vérifie l\'accessibilité de la page Contact', () => {
        cy.visit('/contact');
        cy.checkA11y(undefined, axeOptions);
    });

    it('vérifie l\'accessibilité d\'une page d\'article (si existante)', () => {
        cy.visit('/');
        cy.get('.grid a, .card a').first().click();
        cy.url().should('match', /\/(actualite|press-area\/news)\/.+/);
        cy.checkA11y(undefined, axeOptions);
    });

    it('vérifie l\'accessibilité du formulaire de contact', () => {
        cy.visit('/contact');
        cy.checkA11y('form', axeOptions);
    });
});