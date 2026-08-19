/// <reference types="cypress" />

import 'cypress-axe';

type A11yContext = Parameters<typeof cy.checkA11y>[0];
type A11yOptions = Parameters<typeof cy.checkA11y>[1];

Cypress.Commands.add('checkA11y', (context?: A11yContext, options?: A11yOptions) => {
    cy.injectAxe();
    cy.configureAxe({
        rules: [
            { id: 'color-contrast', enabled: false },
        ],
    });
    return cy.checkA11y(context, options);
});