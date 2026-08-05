/// <reference types="cypress" />

describe('User Journey – Full visitor simulation', () => {
    it('simulates a visitor exploring the site', () => {
        // 1. Arrive on homepage
        cy.visit('/');
        cy.get('[data-testid="hero-carousel"]').should('be.visible');

        // 2. Click on first featured article (if exists)
        cy.get('[data-testid="news-grid"] a').first().click();
        cy.url().should('match', /\/actualite\/.+/);
        cy.get('article, .prose').should('exist');
        cy.go('back');

        // 3. Navigate to About page
        cy.get('nav a').contains('À propos du Sénat').click();
        cy.url().should('include', '/about');
        cy.get('h1').contains('À propos du Sénat').should('be.visible');

        // 4. Go to Structures subpage
        cy.get('a').contains('Structures').click();
        cy.url().should('include', '/about/structures');
        cy.get('h1').contains('Structures du Sénat').should('be.visible');

        // 5. Use search
        cy.get('[data-testid="search-button"]').click();
        cy.get('input[type="search"]').type('loi{enter}');
        cy.url().should('include', '/search?q=loi');
        cy.get('[data-testid="search-results"]').should('exist');

        // 6. Click on first search result
        cy.get('[data-testid="search-results"] a').first().click();
        cy.url().should('not.contain', '/search');
        cy.get('h1').should('exist');

        // 7. Navigate to Press Area
        cy.get('nav a').contains('Espace Presse').click();
        cy.url().should('include', '/press-area');
        cy.get('h1').contains('Espace de Presse').should('be.visible');

        // 8. Scroll to bottom and click on a footer link
        cy.scrollTo('bottom');
        cy.get('footer a').contains('Historique').click();
        cy.url().should('include', '/historical');

        // 9. Interact with chatbot if visible
        cy.get('[data-testid="chatbot-toggle"]').click();
        cy.get('[data-testid="chatbot-window"]').should('be.visible');
        cy.get('textarea').type('Bonjour{enter}');
        cy.get('[data-testid="chatbot-messages"] .message', { timeout: 15000 })
            .should('have.length.at.least', 2);
    });
});