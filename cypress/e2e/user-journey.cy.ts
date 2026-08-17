/// <reference types="cypress" />

describe('User Journey – Full visitor simulation', () => {
    it('simulates a visitor exploring the site', () => {
        cy.visit('/');
        cy.get('.relative.overflow-hidden, [class*="carousel"]').should('be.visible');

        // Cliquer sur le premier article de la grille (s'il existe)
        cy.get('.grid a, .card a').first().click({ force: true });
        cy.url().should('match', /\/actualite\/.+/);
        cy.get('article, .prose').should('exist');
        cy.go('back');

        cy.get('nav a').contains('À propos du Sénat').click();
        cy.url().should('include', '/about');
        cy.get('h1').contains('À propos du Sénat').should('be.visible');

        cy.get('a').contains('Structures').click();
        cy.url().should('include', '/about/structures');
        cy.get('h1').contains('Structures du Sénat').should('be.visible');

        // Recherche
        cy.get('button:has(svg[data-icon="search"])').click();
        cy.get('input[type="search"]').type('loi{enter}');
        cy.url().should('include', '/search?q=loi');
        cy.get('[class*="result"]').should('exist');

        cy.get('[class*="result"] a').first().click();
        cy.url().should('not.contain', '/search');
        cy.get('h1').should('exist');

        cy.get('nav a').contains('Espace Presse').click();
        cy.url().should('include', '/press-area');
        cy.get('h1').contains('Espace de Presse').should('be.visible');

        cy.scrollTo('bottom');
        cy.get('footer a').contains('Historique').click();
        cy.url().should('include', '/historical');
        cy.get('h1').contains('Histoire du Sénat').should('be.visible');

        // Chatbot : un bouton flottant, souvent avec une icône MessageCircle
        cy.get('button:has(svg[data-icon="message-circle"])').click({ force: true });
        cy.get('.fixed.bottom-20, [class*="chatbot-window"]').should('be.visible');
        cy.get('textarea').type('Bonjour{enter}');
        cy.get('.message, [class*="message"]', { timeout: 15000 })
            .should('have.length.at.least', 2);
    });
});