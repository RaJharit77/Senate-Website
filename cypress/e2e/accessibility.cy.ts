/// <reference types="cypress" />
/// <reference types="cypress-axe" />

describe('Tests d\'accessibilité', () => {
    before(() => {
        Cypress.config('screenshotOnRunFailure', false);
    });

    after(() => {
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
        rules: {
            'color-contrast': { enabled: false },
            'page-has-heading-one': { enabled: false },
        },
    };

    it('vérifie l\'accessibilité de la page d\'accueil', () => {
        cy.visit('/');
        cy.wait(500);
        cy.checkA11y('main', axeOptions);
    });

    it('vérifie l\'accessibilité de la page À propos', () => {
        cy.visit('/about');
        cy.wait(500);
        cy.checkA11y('main', axeOptions);
    });

    it('vérifie l\'accessibilité de la page Contact', () => {
        cy.visit('/contact');
        cy.wait(500);
        cy.checkA11y('main', axeOptions);
    });

    it('vérifie l\'accessibilité d\'une page d\'article (si existante)', () => {
        cy.visit('/');
        cy.get('.grid a, .card a').first().click();
        cy.url().should('match', /\/(actualite|press-area\/news)\/.+/);
        cy.wait(500);
        cy.checkA11y('main', axeOptions);
    });

    it('vérifie l\'accessibilité du formulaire de contact', () => {
        cy.visit('/contact');
        cy.wait(500);
        cy.checkA11y('form', axeOptions);
    });
});