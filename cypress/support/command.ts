/// <reference types="cypress" />

export { };

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            visitAndWait(url: string): Chainable<AUTWindow>;
            checkLayout(): Chainable<void>;
        }
    }
}

Cypress.Commands.add('visitAndWait', (url: string) => {
    cy.visit(url);
    cy.get('main', { timeout: 10000 }).should('be.visible');
    cy.get('header').should('exist');
    cy.get('footer').should('exist');
});

Cypress.Commands.add('checkLayout', () => {
    cy.get('header').should('exist');
    cy.get('footer').should('exist');
    cy.get('main').should('exist');
});