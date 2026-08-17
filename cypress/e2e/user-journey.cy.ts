/// <reference types="cypress" />

describe('User Journey – Full visitor simulation', () => {
    it('simulates a visitor exploring the site', () => {
        cy.visit('/');
        cy.get('.relative.overflow-hidden, [class*="carousel"]').should('be.visible');

        cy.get('[data-testid="news-grid"] a').first().click({ force: true });
        cy.url().should('match', /\/actualite\/.+/);
        cy.get('article, .prose').should('exist');
        cy.go('back');

        cy.get('nav a').contains('À propos du Sénat').click();
        cy.url().should('include', '/about');
        cy.get('h1').contains('À propos du Sénat').should('be.visible');

        cy.get('a').contains('Structures').click();
        cy.url().should('include', '/about/structures');
        cy.get('h1').contains('Structures du Sénat').should('be.visible');

        cy.get('[data-testid="search-button"]').click();
        cy.get('input[type="search"]').type('loi{enter}');
        cy.url().should('include', '/search?q=loi');
        cy.get('[data-testid="search-results"]').should('exist');

        cy.get('[data-testid="search-results"] a').first().click();
        cy.url().should('not.contain', '/search');
        cy.get('h1').should('exist');

        cy.get('nav a').contains('Espace Presse').click();
        cy.url().should('include', '/press-area');
        cy.get('h1').contains('Espace de Presse').should('be.visible');

        cy.scrollTo('bottom');
        cy.get('footer a').contains('Historique').click();
        cy.url().should('include', '/historical');
        cy.get('h1').contains('Histoire du Sénat').should('be.visible');

        cy.get('[role="tablist"] button').first().click();
        cy.get('[role="tabpanel"]').should('be.visible');

        cy.get('nav a').contains('Contact').click();
        cy.url().should('include', '/contact');
        cy.get('h1').contains('Contact').should('be.visible');
        cy.get('form').should('exist');
        cy.get('input[name="name"]').type('Jane Doe');
        cy.get('input[name="email"]').type('jane.doe@example.com');

        cy.get('[data-testid="chatbot-toggle"]').click({ force: true });
        cy.get('[data-testid="chatbot-window"]').should('be.visible');
        cy.get('textarea').type('Bonjour{enter}');
        cy.get('[data-testid="chatbot-messages"] .message', { timeout: 15000 })
            .should('have.length.at.least', 2);
    });
});